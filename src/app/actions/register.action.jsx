'use server'

import bcrypt from 'bcryptjs'

import { RegisterSchema } from 'lib/schema'
import { db } from 'lib/db'
import { getUserByPhone, getUserByEmail } from 'lib/utils/auth.util'
import { login } from './login.action'

export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Barcha maydonlar to'ldirilishi shart" }
  }

  const { phone, email, password, data } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingPhone = await getUserByPhone(phone)

  if (existingPhone?.phone === phone) {
    return { error: 'User phone already exists.' }
  }
  const existingEmail = await getUserByEmail(email)

  if (existingEmail?.email === email) {
    return { error: 'User email already exists.' }
  }

  try {
    await db.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
      },
    })
    const res = await login({ phone, password, data })

    if (res?.error) {
      return { error: res.error }
    }
    return res
  } catch (error) {
    return { error }
  }
}
