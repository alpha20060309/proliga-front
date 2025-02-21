/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import YandexProvider from "next-auth/providers/yandex";
import FacebookProvider from "next-auth/providers/facebook";
import { SupabaseAdapter } from "@auth/supabase-adapter";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
    }),
    // YandexProvider({
    //   clientId: process.env.NEXT_PUBLIC_YANDEX_ID ?? "",
    //   clientSecret: process.env.NEXT_PUBLIC_YANDEX_SECRET ?? "",
    //   authorization: {
    //     params: {
    //       force_confirm: "yes",
    //     },
    //   },
    // }),
    // FacebookProvider({
    //   clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID ?? "",
    //   clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET ?? "",
    // }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
  }),
});

console.log(handler)

export { handler as GET, handler as POST };