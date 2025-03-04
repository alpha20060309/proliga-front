"use server"

import bcrypt from "bcryptjs"
import { db } from "lib/db"
import { getUserByPhone } from "lib/utils/auth.util"
import { ResetPasswordSchema } from "lib/schema"

export const resetPassword = async (values) => {

  const validatedFields = ResetPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { phone, code, password } = validatedFields.data

  try {
    // 1. Find the user by phone number
    const existingUser = await getUserByPhone(phone)

    if (!existingUser) {
      return { error: "User not found" }
    }

    // 2. Check if the provided code matches the stored code
    if (existingUser?.sms_code !== code || !existingUser?.sms_code) {
      return { error: "Invalid SMS code" }
    }

    const codeAgeInMinutes = (new Date() - existingUser.sms_created_at) / (1000 * 60)
    if (codeAgeInMinutes > 3) {
      return { error: "SMS code has expired" }
    }

    // 4. Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 5. Update the user's password and delete the verification code
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  } catch (error) {
    console.error("Password reset error:", error)
    return { error: "An unknown error occurred" }
  }
}

