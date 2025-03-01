"use server";

import { LoginSchema } from "lib/schema";
import { signIn } from "app/api/auth/[...nextauth]/route";
import { getUserByPhone } from "lib/utils/auth.util";

export const login = async (
  values,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { phone, password } = validatedFields.data;

  const existingUser = await getUserByPhone(phone);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Login yoki parol xato" };
  }

  try {
    await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    return { success: true }
  } catch (error) {
    if (error) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
