import NextAuth from 'next-auth'
import { authConfig } from 'auth.config'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from 'lib/db'
import { getUserById } from 'lib/utils/auth.util'
import { LANGUAGE } from 'app/utils/languages.util'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true
      if (!user?.id) return false
      return true
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = +token.sub
      }
      if (session.user) {
        const user = await getUserById(session.user.id)
        session.user.email = token.email || user.email
        session.user.phone = user?.phone || null
        session.user.isOAuth = user?.isOAuth || false
        session.user.birth_date = user?.birth_date || null
        session.user.name = user?.name || null
        session.user.last_name = user?.last_name || null
        session.user.middle_name = user?.middle_name || null
        session.user.gender = user?.gender || null
        session.user.bio = user?.bio || null
        session.user.balance = user?.balance || null
        session.user.image = user?.image || null
        session.user.deleted_at = user?.deleted_at || null
        session.user.language = user?.language || LANGUAGE.uz
        session.user.phone_verified = user?.phone_verified || false
        session.user.location = user?.location || null
        session.user.ntf_token = user?.ntf_token || null
        session.user.ntf_topics = user?.ntf_topics || null
        session.user.ntf_enabled = user?.ntf_enabled || false
        session.user.ntf_token_created_at = user?.ntf_token_created_at || null
        session.user.dark_theme = user?.dark_theme || {}
        session.user.light_theme = user?.light_theme || {}
      }
      return session
    },
  },
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth',
    signOut: '/',
    error: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // ~ 1 month
  },
})
