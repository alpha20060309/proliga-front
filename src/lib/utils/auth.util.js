import prisma from "lib/prisma"
import { cache } from "react"

export const getUserById = cache(async (id) => {
  const user = await prisma.user.findUnique({
    where: { id, deleted_at: null },
  })

  return user
})

export const getUserByPhone = cache(async (phone) => {
  const user = await prisma.user.findUnique({
    where: { phone, deleted_at: null },
  })

  return user
})

export const getUserByEmail = cache(async (email) => {
  const user = await prisma.user.findUnique({
    where: { email, deleted_at: null },
  })
  
  return user
})
