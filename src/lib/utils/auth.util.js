import prisma from "lib/prisma"

export const getAccountByUserId = async (user_id) => {
  try {
    const account = await prisma.auth_account.findUnique({
      where: { user_id },
    })

    return account
  } catch {
    return null
  }
}

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  } catch {
    return null
  }
}

export const getUserByPhone = async (phone) => {
  try {
    const user = await prisma.user.findUnique({
      where: { phone },
    })
    return user
  } catch {
    return null
  }
}

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  } catch {
    return null
  }
}
