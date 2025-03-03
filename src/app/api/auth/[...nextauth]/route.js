/* eslint-disable no-unused-vars */
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
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET ?? "",
      authorization:
        "https://oauth.yandex.ru/authorize?scope=login:info+login:email+login:avatar+login:default_phone+login:birthday",
      async profile(profile) {
        console.log("Yandex", profile)

        return {
          name: profile?.first_name || "",
          email_oauth: profile?.default_email || profile?.emails[0] || null,
          image: profile?.is_avatar_empty === false ? profile.avatar_url : null,
          last_name: profile?.last_name || "",
          phone_oauth: profile?.default_phone?.number || null,
          isOAuth: true,
          birth_date: profile?.birthday ? new Date(profile.birthday) : null,
        }
      }
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
    async signIn({ user, account, profile }) {
      console.log('profile', profile)
      console.log('account', account)
      console.log('user', user)
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
      }

      return session;
    },
    async jwt({ token, account, profile, user }) {
      console.log('token', token)
      console.log('profile', profile)
      console.log('account', account)
      console.log('user', user)
      return token
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
  secret: process.env.NEXT_PUBLIC_JWT,
  trustHost: true
});
