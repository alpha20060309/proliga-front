'use client'

import '../../auth.config'
import { memo } from 'react'
import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'
import FirebaseProvider from './Firebase.provider'
import GeolocationProvider from './Geolocation.provider'
import ThemesProviders from './Theme.provider'
import CustomThemeProvider from './CustomTheme.provider'

const RootProvider = ({ children }) => {
  return (
    <ThemesProviders>
      <SessionProvider>
        <ReduxProvider>
          <AuthProvider>
            <InitialStateProvider>
              <GeolocationProvider>
                <FirebaseProvider>
                  <CustomThemeProvider>{children}</CustomThemeProvider>
                </FirebaseProvider>
              </GeolocationProvider>
            </InitialStateProvider>
          </AuthProvider>
        </ReduxProvider>
      </SessionProvider>
    </ThemesProviders>
  )
}

export default memo(RootProvider)
