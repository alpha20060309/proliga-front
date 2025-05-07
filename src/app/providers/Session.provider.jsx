'use client'

import { SessionProvider } from 'next-auth/react'
import { memo } from 'react'
const AuthSessionProvider = ({ children }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  )
}

export default memo(AuthSessionProvider)
