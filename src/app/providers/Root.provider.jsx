'use client'

import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'

export default function RootProvider({ children }) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <SessionProvider>
          <InitialStateProvider>{children}</InitialStateProvider>
        </SessionProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
