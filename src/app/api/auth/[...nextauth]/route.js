/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "lib/db/db";
import { getUserById, getAccountByUserId } from "lib/utils/auth.util";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
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
      async authorize(credentials, req) {
        console.log("Authorize function called");
        console.log("Credentials:", credentials);

        const { phone, password } = credentials ?? {};


        console.log("Authentication failed");
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  callbacks: {
    // async signIn({ user, account }) {
    //   // Allow OAuth without email verification
    //   console.log('sign in', user)
    //   if (account?.provider !== "credentials") return true;

    //   if (!user?.id) return false;

    //   const existingUser = await getUserById(user.id);

    //   return true;
    // },

    async session({ token, session }) {
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
      if (user) {
        token.phone = user.phone;
      }

      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.isTwoFactorEnabled = existingUser.is_two_factor_enabled;
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


console.log(handler)

export { handler as GET, handler as POST };