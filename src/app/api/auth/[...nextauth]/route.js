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
      // authorization: {
      //   params: {
      //     redirect_uri: process.env.NEXT_PUBLIC_URL + '/auth',
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //     // redirect_uri: process.env.NEXT_PUBLIC_URL + '/api/auth/callback/google'
      //   }
      // }
    }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET ?? "",
      // authorization: {
      //   params: {
      //     force_confirm: "yes",
      //   },
      // },
    }),
  ],
  adapter: supabaseAdapter,
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  secret: process.env.NEXT_PUBLIC_JWT
});


console.log(handler)

export { handler as GET, handler as POST };