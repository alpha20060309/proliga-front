import { useEffect } from 'react'
import {
  supabase,
  SUPABASE_AUTH_EVENTS,
  SUPABASE_PROVIDERS,
} from 'app/lib/supabaseClient'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAgent,
  selectGeo,
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { useCheckUserRegistered } from 'app/hooks/auth/useCheckUserRegistered/useCheckUserRegistered'

export default function AuthListenerProvider({ children }) {
  const dispatch = useDispatch()
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { fingerprint } = useSelector((store) => store.auth)
  const { login } = useGoogleLogin()
  const { checkUserRegistered } = useCheckUserRegistered()

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))
    const app_version =
      localStorage.getItem('config') !== 'undefined' &&
      JSON.parse(localStorage.getItem('config'))?.app_version?.value
    const SIGN_IN_METHOD = localStorage.getItem('sign-in-method')

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === SUPABASE_AUTH_EVENTS.SIGNED_IN) {
        const rootProvider = session?.user?.app_metadata?.provider

        if (
          Boolean(auth?.id) ||
          Boolean(table?.id) ||
          Boolean(userAuth?.id) ||
          Boolean(userTable?.id) ||
          !session?.user?.id
        )
          return

        const data = await checkUserRegistered({ guid: session?.user?.id })
        const phone = data?.phone

        if (
          rootProvider === SUPABASE_PROVIDERS.EMAIL &&
          SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE &&
          phone &&
          data
        ) {
          return login({
            auth: session?.user,
            geo,
            agent,
            fingerprint,
            app_version,
          })
        }
        if (
          rootProvider === SUPABASE_PROVIDERS.GOOGLE &&
          SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE &&
          data
        ) {
          if (phone) {
            return login({
              auth: session?.user,
              geo,
              agent,
              fingerprint,
              app_version,
            })
          } else {
            return dispatch(setPhoneModal(true))
          }
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [
    login,
    userAuth,
    userTable,
    agent,
    geo,
    fingerprint,
    dispatch,
    checkUserRegistered,
  ])

  return <>{children}</>
}
