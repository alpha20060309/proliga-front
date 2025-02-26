"use server";

import bcrypt from "bcryptjs";

import { RegisterSchema } from "lib/schema";
import { db } from "@/lib/db";
import { getUserByPhone } from "lib/utils/auth.util";


export const register = async (values) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password, phone } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByPhone(phone);

  if (existingUser) {
    return { error: "User email already exists." };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: "Successfully registered!" };
};