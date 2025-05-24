'use server'

import bcrypt from 'bcryptjs'
import { db } from 'lib/db'
import { getUserByPhone } from 'lib/utils/auth.util'
import { ResetPasswordSchema } from 'lib/schema'

export const resetPassword = async (values) => {
  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Barcha maydonlar to'ldirilishi shart" }
  }

  const { phone, code, password } = validatedFields.data

  try {
    const existingUser = await getUserByPhone(phone)

    if (!existingUser) {
      return { error: 'Foydalanuvchi topilmadi' }
    }

    if (existingUser?.sms_code !== code || !existingUser?.sms_code) {
      return { error: 'SMS kodingiz xato' }
    }

    const codeAgeInMinutes =
      (new Date() - existingUser.sms_created_at) / (1000 * 60)
    if (codeAgeInMinutes > 3) {
      return { error: 'Kod eskirib qolgan!' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    })

    return { success: true }
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return { error: 'An unknown error occurred' }
  }
}
