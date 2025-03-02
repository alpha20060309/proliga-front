/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAgent,
  selectGeo,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'
import { toast } from 'react-toastify'

export default function AuthListener({ children }) {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const userTable = useSelector(selectUserTable)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { fingerprint } = useSelector((store) => store.auth)
  const { login } = useGoogleLogin()

  useEffect(() => {
    const handleAuthChange = async () => {
      if (status === 'authenticated' && session?.user) {
        const { user } = session

        const app_version = JSON.parse(localStorage.getItem('config'))
          ?.app_version?.value
        const SIGN_IN_METHOD = localStorage.getItem('sign-in-method')

        // if (Boolean(userTable?.id) || !user.id) return

        const phone = data?.phone
        console.log(data)

        if (SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE && data) {
          if (phone) {
            toast.warning(t('Sizning raqamingiz tasdiqlanmagan'), {
              theme: 'dark',
            })
            toast.info(
              t('We are redirecting you to an sms confirmation page!'),
              {
                theme: 'dark',
              }
            )
            await sendOTP({
              phone: table?.phone,
              shouldRedirect: true,
              redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(table?.phone)}`,
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
  }, [session, status, login, userTable, agent, geo, fingerprint, dispatch])

  return <>{children}</>
}
