/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAgent,
  selectGeo,
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'
import { useCheckUserRegistered } from 'app/hooks/auth/useCheckUserRegistered/useCheckUserRegistered'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'

export default function AuthListener({ children }) {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { fingerprint } = useSelector((store) => store.auth)
  const { login } = useGoogleLogin()
  const { checkUserRegistered } = useCheckUserRegistered()

  useEffect(() => {
    const handleAuthChange = async () => {
      if (status === 'authenticated' && session?.user) {
        const { user } = session
        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
        const auth =
          JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`)) || {}
        const table =
          JSON.parse(localStorage.getItem(`user-table-${sbUrl}`)) || {}
        const app_version = JSON.parse(localStorage.getItem('config'))
          ?.app_version?.value
        const SIGN_IN_METHOD = localStorage.getItem('sign-in-method')

        if (
          Boolean(auth?.id) ||
          Boolean(table?.id) ||
          Boolean(userAuth?.id) ||
          Boolean(userTable?.id) ||
          !user.id
        )
          return

        const data = await checkUserRegistered({ guid: user.id })
        const phone = data?.phone
        console.log(data)

        if (SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE && data) {
          if (phone) {
            console.log('executed')
            return login({
              auth: user,
              geo,
              agent,
              fingerprint,
              app_version,
            })
          } else {
            return dispatch(setPhoneModal(true))
          }
        }
        if (SIGN_IN_METHOD === SUPABASE_PROVIDERS.YANDEX && data) {
          if (phone) {
            console.log('executed')
            return login({
              auth: user,
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
    }

    handleAuthChange()
  }, [
    session,
    status,
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
