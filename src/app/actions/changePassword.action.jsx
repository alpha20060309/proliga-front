"use server"

import { ChangePasswordSchema } from "lib/schema"
import { db } from "lib/db" // Adjust this import based on your Prisma client setup
import bcrypt from "bcryptjs"

export const changePassword = async (values) => {
  try {
    const validatedFields = ChangePasswordSchema.safeParse(values)

    if (!validatedFields.success) {
      return { error: "Invalid fields" }
    }

    const { currentPassword, newPassword, id } = validatedFields.data

    const user = await db.user.findUnique({
      where: { id },
    })

    if (!user || !user.password) {
      return { error: "User not found" }
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return { error: "Current password is incorrect" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        updated_at: new Date(),
      },
    })

    return { success: "Password has been changed successfully" }
  } catch (error) {
    console.error("CHANGE_PASSWORD_ERROR", error)
    return { error: "An unknown error occurred" }
  }
}

