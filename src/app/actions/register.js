"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "lib/schema";
// import { db } from "@/lib/db";
import { db } from "lib/db/db";
import { getUserByPhone, getUserByEmail } from "lib/utils/auth.util";


export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingPhone = await getUserByPhone(phone);

  if (existingPhone) {
    return { error: "User phone already exists." };
  }

  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return { error: "User email already exists." };
  }

  await db.user.create({
    data: {
      email,
      phone,
      password: hashedPassword,
    },
  });

  return { success: "Successfully registered!" };
};