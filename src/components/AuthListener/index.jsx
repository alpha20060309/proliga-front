/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import {
  supabase,
  SUPABASE_AUTH_EVENTS,
  SUPABASE_PROVIDERS,
} from 'app/lib/supabaseClient'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'
import { useSelector } from 'react-redux'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { configKey } from 'app/utils/config.util'
import {
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'

export default function AuthListener() {
  const config = useSelector(selectSystemConfig)
  const app_version = config[configKey.app_version]?.value ?? ''
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const { login } = useGoogleLogin()

  useEffect(() => {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === SUPABASE_AUTH_EVENTS.SIGNED_IN) {
        const rootProvider = session?.user?.app_metadata?.provider
        const secondaryProviders = session?.user?.app_metadata?.providers

        if (!session?.user?.id) return
        if (
          Boolean(auth?.id) ||
          Boolean(table?.id) ||
          Boolean(userAuth?.id) ||
          Boolean(userTable?.id)
        )
          return
        if (rootProvider === SUPABASE_PROVIDERS.EMAIL) {
          if (
            secondaryProviders.includes(
              SUPABASE_PROVIDERS.GOOGLE,
              SUPABASE_PROVIDERS.FACEBOOK
            ) &&
            !userAuth?.id &&
            !userTable?.id
          ) {
            login({ auth: session?.user, app_version })
            if (app_version) {
              localStorage.setItem('app_version', app_version)
            }
          }
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [login, app_version, userAuth, userTable])

  return null
}
