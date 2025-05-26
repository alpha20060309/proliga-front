import { db } from 'lib/db'

export const getAccountByUserId = async (user_id) => {
  try {
    const account = await db.auth_account.findUnique({
      where: { user_id },
      cacheStrategy: {
        ttl: 60,
      },
    })

    return account
  } catch {
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      cacheStrategy: {
        ttl: 60,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserByPhone = async (phone) => {
  try {
    const user = await db.user.findUnique({
      where: { phone },
      cacheStrategy: {
        ttl: 60,
      },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
      cacheStrategy: {
        ttl: 60,
      },
    })
    return user
  } catch {
    return null
  }
}
