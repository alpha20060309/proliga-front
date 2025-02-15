'use client'

import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import AuthListenerProvider from './AuthListener.provider'

export default function RootProvider({ children }) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <AuthListenerProvider>
          <InitialStateProvider>{children}</InitialStateProvider>
        </AuthListenerProvider>
      </AuthProvider>
    </ReduxProvider>
  )
}
