import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { z } from "zod"

const signInWithPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

async function getUserByEmail(email) {
  const [user] = await db.select().from(users).where(eq(users.email, email))
  return user
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedCredentials = signInWithPasswordSchema.safeParse(credentials)

        if (validatedCredentials.success) {
          const { email, password } = validatedCredentials.data
          const user = await getUserByEmail(email)

          if (!user || !user.passwordHash) return null

          const passwordIsValid = await bcrypt.compare(password, user.passwordHash)

          if (passwordIsValid) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
            }
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
}

