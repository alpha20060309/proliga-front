'use client'

import { memo } from 'react'
import '../lib/i18n.config'
import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'
import FirebaseProvider from './FirebaseProvider'
import GeolocationProvider from './GeolocationProvider'

const RootProvider = ({ children }) => {
  return (
    <SessionProvider>
      <ReduxProvider>
        <AuthProvider>
          <InitialStateProvider>
            <GeolocationProvider>
              <FirebaseProvider>{children}</FirebaseProvider>
            </GeolocationProvider>
          </InitialStateProvider>
        </AuthProvider>
      </ReduxProvider>
    </SessionProvider>
  )
}

export default memo(RootProvider)
