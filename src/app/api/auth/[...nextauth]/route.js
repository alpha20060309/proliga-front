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
          console.log(user)
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
      console.log('sign in', user)
      if (account?.provider !== "credentials") return true;

      if (!user?.id) return false;

      const existingUser = await getUserById(user.id);

      return true;
    },

    async session({ token, session }) {
      // console.log("got session", db)
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.isOAuth = token.isOAuth;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }) {
      console.log("got jwt")
      if (user) {
        token.phone = user.phone;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);



      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.phone = existingUser.phone;
      token.role = existingUser.role;

      return token;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXT_PUBLIC_JWT
});

