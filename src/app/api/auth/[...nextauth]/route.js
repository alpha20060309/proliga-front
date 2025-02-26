/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "lib/db/db";
import { getUserById, getAccountByUserId } from "lib/utils/auth.util";

const supabaseAdapter = SupabaseAdapter({
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
})



const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  callbacks: {
    //   async session({ token, session }) {
    //     if (token.sub && session.user) {
    //       session.user.id = token.sub;
    //     }

    //     if (token.role && session.user) {
    //       session.user.role = token.role;
    //     }

    //     if (session.user) {
    //       session.user.isOAuth = token.isOAuth;
    //       session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
    //       session.user.name = token.name;
    //       session.user.email = token.email;
    //     }

    //     return session;
    //   },
    // },
    // async signIn({ user, account }) {
    //   console.log("signIn", user, account)
    //   return true
    // },
    // async jwt({ token }) {
    //   console.log("jwt", token)
    //   return token
    // },
    // async jwt({ token }) {
    //   if (!token.sub) return token;

    //   const existingUser = await getUserById(token.sub);

    //   if (!existingUser) return token;

    //   const existingAccount = await getAccountByUserId(existingUser.id);

    //   token.isOAuth = !!existingAccount;
    //   token.isTwoFactorEnabled = existingUser.is_two_factor_enabled;
    //   token.name = existingUser.name;
    //   token.email = existingUser.email;
    //   token.role = existingUser.role;

    //   return token;
    // },
    secret: process.env.NEXT_PUBLIC_JWT,
    // session: {
    //   strategy: "jwt",
    // },
  }
});


console.log(handler)

export { handler as GET, handler as POST };