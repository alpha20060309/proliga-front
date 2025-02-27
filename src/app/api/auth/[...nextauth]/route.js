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
          // console.log(user)
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

      const existingUser = await getUserById(user.id);

      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        const existingUser = await getUserById(token.sub);


        session.user.isOAuth = token.isOAuth;
        session.user.id = token.id;
        session.user.guid = token.guid;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.photo = token.photo;
        session.user.last_name = token.last_name;
        session.user.middle_name = token.middle_name;
        session.user.gender = token.gender;
        session.user.birth_date = token.birth_date;
        session.user.bio = token.bio;
        session.user.balance = token.balance;
        session.user.deleted_at = token.deleted_at;
        session.user.language = token.language;
        session.user.phone_verified = token.phone_verified;
        session.user.visitor = token.visitor;
        session.user.geo = token.geo;
        session.user.agent = token.agent;
        session.user.role = token.role;
      }
      console.log("session", session)
      console.log('token', token)

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

      token.id = existingUser.id;
      token.guid = existingUser.guid;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.phone = existingUser.phone;
      token.photo = existingUser.photo;
      token.last_name = existingUser.last_name;
      token.middle_name = existingUser.middle_name;
      token.gender = existingUser.gender;
      token.birth_date = existingUser.birth_date;
      token.bio = existingUser.bio;
      token.balance = existingUser.balance;
      token.deleted_at = existingUser.deleted_at;
      token.language = existingUser.language;
      token.phone_verified = existingUser.phone_verified;
      token.visitor = existingUser.visitor;
      token.geo = existingUser.geo;
      token.agent = existingUser.agent;
      token.isOAuth = !!existingAccount

      return token;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXT_PUBLIC_JWT
});

