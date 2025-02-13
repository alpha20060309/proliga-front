/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import {
  supabase,
  SUPABASE_AUTH_EVENTS,
  SUPABASE_PROVIDERS,
} from 'app/lib/supabaseClient'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'
import { useDispatch, useSelector } from 'react-redux'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { CONFIG_KEY } from 'app/utils/config.util'
import {
  selectAgent,
  selectGeo,
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { useCheckUserRegistered } from 'app/hooks/auth/useCheckUserRegistered/useCheckUserRegistered'

export default function AuthListener() {
  const dispatch = useDispatch()
  const config = useSelector(selectSystemConfig)
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { fingerprint } = useSelector((store) => store.auth)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { login } = useGoogleLogin()
  const { checkUserRegistered } = useCheckUserRegistered()

  useEffect(() => {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))
    const SIGN_IN_METHOD = localStorage.getItem('sign-in-method')

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
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

        checkUserRegistered({ guid: session?.user?.id })

        if (
          rootProvider === SUPABASE_PROVIDERS.EMAIL &&
          SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE
        ) {
          // login({ auth: session?.user, app_version, geo, agent, fingerprint })
          // if (app_version) {
          //   localStorage.setItem('app_version', app_version)
          // }
        }
        if (
          rootProvider === SUPABASE_PROVIDERS.GOOGLE &&
          SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE
        ) {
          if (!userTable?.phone) {
            // return dispatch(setPhoneModal(true))
          }
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [
    login,
    app_version,
    userAuth,
    userTable,
    agent,
    geo,
    fingerprint,
    dispatch,
    checkUserRegistered,
  ])

  return null
}
