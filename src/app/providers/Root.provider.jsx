'use client'

import { memo } from 'react'
import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'
import FirebaseProvider from './FirebaseProvider'
import GeolocationProvider from './GeolocationProvider'
import ThemesProviders from './Theme.provider'

const RootProvider = ({ children }) => {
  return (
    <ThemesProviders>
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
    </ThemesProviders>
  )
}

export default memo(RootProvider)
