'use server'

import { db } from 'lib/db'
import { VerifySmsCodeSchema } from 'lib/schema'

/**
 * Verifies an SMS code sent to a user's phone number
 * Replicates the functionality of the PostgreSQL function "verify__sms_code"
 */
export async function verifySmsCode(values) {
  // Validate input fields
  const validatedFields = VerifySmsCodeSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      status: 400,
      message: 'Invalid fields',
    }
  }

  const { phone_number, confirm_code, is_update = false } = validatedFields.data

  try {
    // Find the user based on phone number (either current or new phone)
    const user = is_update
      ? await db.user.findFirst({ where: { phone_new: phone_number } })
      : await db.user.findFirst({ where: { phone: phone_number } })

    if (!user) {
      return {
        status: 404,
        message: 'User not found',
      }
    }

    // Check if the SMS code matches
    if (user.sms_code !== confirm_code) {
      return {
        status: 404,
        message: 'Code not found',
      }
    }

    // Check if the code has expired (2 minutes)
    const smsDate = user.sms_created_at
    const confirmDate = new Date(smsDate.getTime() + 2 * 60 * 1000) // Add 2 minutes
    const nowDate = new Date()

    if (nowDate > confirmDate) {
      return {
        status: 419,
        message: 'Code expired',
      }
    }

    // Update user's phone verification status
    if (is_update) {
      // Update phone verification for new phone number
      await db.user.update({
        where: { id: user.id },
        data: { phone_verified: true },
      })

      // Call the update__user__phone function to complete the phone update process
      await updateUserPhone(user.id)

      return {
        status: 200,
        message: 'Code verify and phone update successfully',
      }
    } else {
      // Update phone verification for regular verification
      await db.user.update({
        where: { id: user.id },
        data: { phone_verified: true },
      })

      return {
        status: 200,
        message: 'Code successfully verified',
      }
    }
  } catch (error) {
    console.error('SMS verification error:', error)
    return {
      status: 500,
      message: 'An unknown error occurred',
    }
  }
}

/**
 * Updates a user's phone number from phone_new to phone
 * Replicates the functionality of the PostgreSQL function "update__user__phone"
 */
async function updateUserPhone(userId) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
    })

    if (!user || !user.phone_new) {
      return false
    }

    await db.user.update({
      where: { id: userId },
      data: {
        phone: user.phone_new,
        phone_new: null,
      },
    })

    return true
  } catch (error) {
    console.error('Error updating user phone:', error)
    return false
  }
}
