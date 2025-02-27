"use server";

import { LoginSchema } from "lib/schema";
// import { signIn } from "next-auth/react";
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
    console.log('1')
    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });
    console.log(res)
  } catch (error) {
    if (error) {
      console.log(error);

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
