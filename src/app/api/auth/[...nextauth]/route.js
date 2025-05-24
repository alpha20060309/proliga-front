import NextAuth from "next-auth";
import { authConfig } from "auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "lib/db";
import { getUserById } from "lib/utils/auth.util";
import { LANGUAGE } from "app/utils/languages.util";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (!user?.id) return false;
      return true;
    },
    async jwt({ token, user, trigger, session: newSessionData }) {
      if (user?.id) {
        token.sub = user.id.toString();
        const dbUser = await getUserById(+user.id);
        if (dbUser) {
          token.id = +dbUser.id;
          token.email = dbUser.email;
          token.phone = dbUser?.phone;
          token.isOAuth = dbUser?.isOAuth;
          token.birth_date = dbUser?.birth_date;
          token.name = dbUser?.name;
          token.last_name = dbUser?.last_name;
          token.middle_name = dbUser?.middle_name;
          token.gender = dbUser?.gender;
          token.bio = dbUser?.bio;
          token.balance = dbUser?.balance;
          token.image = dbUser?.image;
          token.language = dbUser?.language || LANGUAGE.uz;
          token.phone_verified = dbUser?.phone_verified;
          token.location = dbUser?.location;
          token.ntf_token = dbUser?.ntf_token;
          token.ntf_topics = dbUser?.ntf_topics;
          token.ntf_enabled = dbUser?.ntf_enabled;
          token.ntf_token_created_at = dbUser?.ntf_token_created_at;
        }
      }

      if (trigger === "update" && newSessionData) {
        const dbUser = await getUserById(+token.sub);
        if (dbUser) {
          token.id = +dbUser.id;
          token.email = dbUser.email;
          token.phone = dbUser.phone;
          token.name = dbUser.name;
          token.image = dbUser.image;
          token.birth_date = dbUser.birth_date;
          token.last_name = dbUser.last_name;
          token.middle_name = dbUser.middle_name;
          token.gender = dbUser.gender;
          token.bio = dbUser.bio;
          token.balance = dbUser.balance;
          token.language = dbUser.language || LANGUAGE.uz;
          token.phone_verified = dbUser.phone_verified;
          token.location = dbUser.location;
          token.ntf_token = dbUser.ntf_token;
          token.ntf_topics = dbUser.ntf_topics;
          token.ntf_enabled = dbUser.ntf_enabled;
          token.ntf_token_created_at = dbUser.ntf_token_created_at;
        }
      }
      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        if (token.sub) {
          session.user.id = +token.sub;
        }
        session.user.email = token?.email;
        session.user.phone = token?.phone;
        session.user.isOAuth = token?.isOAuth;
        session.user.birth_date = token?.birth_date;
        session.user.name = token?.name;
        session.user.last_name = token?.last_name;
        session.user.middle_name = token?.middle_name;
        session.user.gender = token?.gender;
        session.user.bio = token?.bio;
        session.user.balance = token?.balance;
        session.user.image = token?.image;
        session.user.language = token?.language;
        session.user.phone_verified = token?.phone_verified;
        session.user.location = token?.location;
        session.user.ntf_token = token?.ntf_token;
        session.user.ntf_topics = token?.ntf_topics;
        session.user.ntf_enabled = token?.ntf_enabled;
        session.user.ntf_token_created_at = token?.ntf_token_created_at;
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
    maxAge: 30 * 24 * 60 * 60, // ~ 1 month
  },
});
