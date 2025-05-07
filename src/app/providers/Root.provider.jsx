'use client'

import { memo } from 'react'
import '../lib/i18n.config'
import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'
import FirebaseProvider from './FirebaseProvider'

const RootProvider = ({ children }) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <AuthProvider>
          <InitialStateProvider>
            <FirebaseProvider>{children}</FirebaseProvider>
          </InitialStateProvider>
        </AuthProvider>
      </ReduxProvider>
    </SessionProvider>
  )
}

export default memo(RootProvider)
