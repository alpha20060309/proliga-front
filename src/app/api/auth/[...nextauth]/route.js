/* eslint-disable no-undef */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "lib/db";
import { getUserById, getUserByPhone } from "lib/utils/auth.util";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "lib/schema";
import bcrypt from "bcryptjs";
import { LANGUAGE } from "app/utils/languages.util";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.YANDEX_CLIENT_SECRET ?? "",
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
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (!user?.id) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = +token.sub;
      }
      if (session.user) {
        const user = await getUserById(session.user.id);
        session.user.email = token.email || user.email;
        session.user.phone = user?.phone || null;
        session.user.isOAuth = user?.isOAuth || false;
        session.user.birth_date = user?.birth_date || null;
        session.user.name = user?.name || null;
        session.user.last_name = user?.last_name || null;
        session.user.middle_name = user?.middle_name || null;
        session.user.gender = user?.gender || null;
        session.user.bio = user?.bio || null;
        session.user.balance = user?.balance || null;
        session.user.image = user?.image || null;
        session.user.deleted_at = user?.deleted_at || null;
        session.user.language = user?.language || LANGUAGE.uz;
        session.user.phone_verified = user?.phone_verified || false;
        session.user.location = user?.location || null;
        session.user.notification_token = user?.notification_token || null;
        session.user.notification_topics = user?.notification_topics || null;
        session.user.enable_notification = user?.enable_notification || false;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 12, // ~ 1 year
  },
});
