// /* eslint-disable no-unused-vars */
// /* eslint-disable no-undef */
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import YandexProvider from "next-auth/providers/yandex";
// import FacebookProvider from "next-auth/providers/facebook";
// import { SupabaseAdapter } from "@auth/supabase-adapter";
// import jwt from 'jsonwebtoken'

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
//       authorization: {
//         params: {
//           redirect_uri: process.env.NEXT_PUBLIC_URL + '/auth',
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           // redirect_uri: process.env.NEXT_PUBLIC_URL + '/api/auth/callback/google'
//         }
//       }
//     }),
//     YandexProvider({
//       clientId: process.env.NEXT_PUBLIC_YANDEX_ID ?? "",
//       clientSecret: process.env.NEXT_PUBLIC_YANDEX_SECRET ?? "",
//       authorization: {
//         params: {
//           force_confirm: "yes",
//         },
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.NEXT_PUBLIC_FACEBOOK_ID ?? "",
//       clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_SECRET ?? "",
//     }),
//   ],
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL,
//     secret: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE,
//   }),
//   session: {
//     strategy: 'jwt'
//   },
//   jwt: {
//     async encode({ token }) {
//       return jwt.sign(token, process.env.NEXT_PUBLIC_JWT);
//     },
//     async decode({ token }) {
//       return jwt.verify(token, process.env.NEXT_PUBLIC_JWT);
//     }, jwt: {
//       async encode({ token }) {
//         return jwt.sign(token, process.env.NEXT_PUBLIC_JWT);
//       },
//       async decode({ token }) {
//         return jwt.verify(token, process.env.NEXT_PUBLIC_JWT);
//       },
//     }
//   },
//   callbacks: {
//     async session({ session, token }) {
//       // Ensure session is properly returned with user data
//       if (session?.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     }
//   },
//   pages: {
//     signIn: '/auth',
//     error: '/auth',
//   },

//   callbacks: {
//     authorized({ auth, request }) {
//       // here you can do many other mechanisms to check the user but for now we just check if the user is logged in
//       return !!auth?.user;
//     },

//     // This callback actually runs before the actual sign in process happens. That means we can perform all kinds of operations here that are accociated with the signin process. So, it's a bit like a middleware.
//     async signIn({ user, account, profile }) {
//       try {
//         console.log(user, account, profile, 'sign in')

//         return true;
//       } catch {
//         return false;
//       }
//     },

//     // This callback runs after the signin callback. And also each time the session is checked out. For example when we call the auth() function. The session here in the parameter is exactly the same as the session object that is returned by the auth() function.
//     async session({ session, user }) {
//       console.log(user, session, 'session')

//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth",
//   },
// });


// export { handler as GET, handler as POST };