import { db } from "lib/db/db";

export const getAccountByUserId = async (user_id) => {
  try {
    const account = await db.auth_account.findFirst({
      where: { user_id },
    });

    return account;
  } catch {
    return null;
  }

};

export const getUserById = async (id) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};