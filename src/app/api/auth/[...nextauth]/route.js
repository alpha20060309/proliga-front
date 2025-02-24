/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import { SupabaseAdapter } from "@auth/supabase-adapter";

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
  adapter: supabaseAdapter,
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  callbacks: {
    async session({ session, user }) {
      console.log('user-1', user)
      console.log("session", session)
      session.user.id = user.id;
      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_JWT
});


console.log(handler)

export { handler as GET, handler as POST };