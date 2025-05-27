'use server'

import { LoginSchema } from 'lib/schema'
import { signIn } from 'app/api/auth/[...nextauth]/route'
import { getUserByPhone } from 'lib/utils/auth.util'
import { db } from 'lib/db'

export const login = async (values) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Barcha maydonlar to'ldirilishi shart" }
  }

  const { phone, password, data } = validatedFields.data

  const existingUser = await getUserByPhone(phone)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Login yoki parol xato' }
  }

  try {
    await signIn('credentials', {
      phone,
      password,
      redirect: false,
    })

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        geo: JSON.stringify(data?.geo),
        agent: JSON.stringify(data?.agent),
        visitor: data?.fingerprint,
        visited_at: new Date(),
      },
    })

    return {
      success: true,
      phone: existingUser?.phone,
      phone_verified: existingUser?.phone_verified,
    }
  } catch (error) {
    if (error) {
      console.log(error)
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Login yoki parol xato' }
        default:
          return { error: 'An unknown error occurred' }
      }
    }

    throw error
  }
}
