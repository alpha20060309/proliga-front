/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import {
  supabase,
  SUPABASE_AUTH_EVENTS,
  SUPABASE_PROVIDERS,
} from 'app/lib/supabaseClient'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'

export default function AuthListener() {
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
        console.log('User signed in:', session)

        const rootProvider = session?.user?.app_metadata?.provider
        const secondaryProviders = session?.user?.app_metadata?.providers

        if (!session?.user?.id) return
        if (rootProvider === SUPABASE_PROVIDERS.EMAIL) {
          if (
            secondaryProviders.includes(
              SUPABASE_PROVIDERS.GOOGLE,
              SUPABASE_PROVIDERS.FACEBOOK
            )
          ) {
            login({ auth: session?.user })
          }
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [login])

  return null
}
