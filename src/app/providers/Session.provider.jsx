'use client'

import { SessionProvider } from 'next-auth/react'

const AuthSessionProvider = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  )
}

export default AuthSessionProvider
