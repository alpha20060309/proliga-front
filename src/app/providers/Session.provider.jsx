'use client'

import { SessionProvider } from 'next-auth/react'

const AuthSessionProvider = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

export default AuthSessionProvider
