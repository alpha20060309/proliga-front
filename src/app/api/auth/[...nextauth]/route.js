/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "lib/db";
import { getUserById, getAccountByUserId, getUserByPhone } from "lib/utils/auth.util";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "lib/schema";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { phone, password } = validatedFields.data;

          const user = await getUserByPhone(phone);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user?.id) return false;

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        const user = await getUserById(session.user.id);
        console.log('user', user)

        session.user.isOAuth = user?.isOAuth || null;
        session.user.birth_date = user?.birth_date || null
        // session.user.name = token.name;
        // session.user.email = token.email;


      }

      return session;
    },
    async jwt({ token, user, account, profile }) {

      if (!token.sub) return token;
      // const merged = {
      //   ...token,
      //   ...user
      // }

      // if (user) {
      //   const existingUser = await getUserById(token.sub);
      //   if (!existingUser) return token;

      //   // console.log("user", user)


      //   // const existingAccount = await getAccountByUserId(existingUser.id);
      //   console.log(user)
      //   token.phone = user.phone;
      //   token.id = existingUser.id;
      //   token.name = existingUser?.name;
      //   token.email = existingUser?.email;
      //   token.phone = existingUser?.phone;
      //   token.birth_date = user?.birth_date;
      // }
      // console.log('token', token)
      return token;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 12, // ~ 1 year
  },
  secret: process.env.NEXT_PUBLIC_JWT

});


// token.last_name = existingUser?.last_name;
// token.middle_name = existingUser?.middle_name;
// token.gender = existingUser?.gender;
// token.bio = existingUser?.bio;
// token.balance = existingUser?.balance;
// token.deleted_at = existingUser?.deleted_at;
// token.language = existingUser?.language;
// token.phone_verified = existingUser?.phone_verified;
// token.visitor = existingUser?.visitor;
// token.geo = existingUser?.geo;
// token.agent = existingUser?.agent;
// token.isOAuth = !!existingAccount
// if (session.user) {
//   // const existingUser = await getUserById(token.sub);


//   // session.user.isOAuth = token.isOAuth;
//   // session.user.id = token.id;
//   // session.user.name = token?.name;
//   // session.user.email = token?.email;
//   // session.user.phone = token?.phone;
//   // session.user.last_name = token?.last_name;
//   // session.user.middle_name = token?.middle_name;
//   // session.user.gender = token?.gender;
//   // session.user.birth_date = token?.birth_date;
//   // session.user.bio = token?.bio;
//   // session.user.balance = token?.balance;
//   // session.user.deleted_at = token?.deleted_at;
//   // session.user.language = token?.language;
//   // session.user.phone_verified = token?.phone_verified;
//   // session.user.visitor = token?.visitor;
//   // session.user.geo = token?.geo;
//   // session.user.agent = token?.agent;
// }
