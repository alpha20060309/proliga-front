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
    // YandexProvider({
    //   clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID ?? "",
    //   clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET ?? "",
    //   // async profile(profile) {
    //   //   console.log('profile', profile)
    //   //   return { ...profile }
    //   // },
    //   async authorize(credentials) {
    //     console.log('credentials', credentials)
    //     return { ...credentials }
    //   },

    //   // authorization: {
    //   //   params: {
    //   //     force_confirm: "yes",
    //   //   },
    //   // },
    // }),
    YandexProvider({
      clientId: process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_YANDEX_CLIENT_SECRET ?? "",
      // authorization: {
      //   url: "https://oauth.yandex.ru/authorize?scope=login:info+login:email+login:avatar+login:default_phone",
      // },
      // scopes: ['phone_number'],
      // profile(profile) {
      //   console.log('profile', profile)
      //   return {
      //     id: profile.id,
      //     name: profile.real_name || profile.display_name,
      //     email: profile.default_email,
      //     image: profile.is_avatar_empty
      //       ? null
      //       : `https://avatars.yandex.net/get-yapic/${profile.default_avatar_id}/islands-200`,
      //     phone: profile.default_phone?.number,
      //   }
      // },
    }),
  ],
  adapter: supabaseAdapter,
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth'
  },
  callbacks: {
    // async jwt({ token, user, account, profile }) {
    //   if (user) {
    //     token.user = user
    //   }
    //   if (account && profile) {
    //     token.yandexProfile = profile
    //   }
    //   return token
    // },
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