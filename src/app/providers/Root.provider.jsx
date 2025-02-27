'use client'

import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'
// import AuthListener from './AuthListener.provider'

export default function RootProvider({ children }) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <SessionProvider>
          {/* <AuthListener> */}
            <InitialStateProvider>{children}</InitialStateProvider>
          {/* </AuthListener> */}
        </SessionProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
