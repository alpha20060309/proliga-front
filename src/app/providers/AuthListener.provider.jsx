/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
'use client'

import { useEffect, memo } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAgent, selectGeo } from 'app/lib/features/auth/auth.selector'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { SUPABASE_PROVIDERS } from 'app/lib/supabaseClient'
import { toast } from 'react-toastify'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useTranslation } from 'react-i18next'

function AuthListener({ children }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sendOTP } = useSendOTP()
  const { data: session, status } = useSession()
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { fingerprint } = useSelector((store) => store.auth)

  useEffect(() => {
    const handleAuthChange = async () => {
      if (status === 'authenticated' && session?.user) {
        const { user } = session

        const app_version = JSON.parse(localStorage.getItem('config'))
          ?.app_version?.value
        const SIGN_IN_METHOD = localStorage.getItem('sign-in-method')
        const otp = `otp_sent_${user.phone}_${session.expires}`

        if (!user) {
          return
        }

        if (localStorage.getItem(otp)) {
          return
        }

        if (
          SIGN_IN_METHOD === SUPABASE_PROVIDERS.GOOGLE ||
          SIGN_IN_METHOD === SUPABASE_PROVIDERS.YANDEX
        ) {
          if (!user?.email || !user?.phone) {
            dispatch(setPhoneModal(true))
            return
          }
          if (!user?.phone_verified) {
            localStorage.setItem(otp, 'true')
            localStorage.setItem('app_version', app_version)
            await sendOTP({
              phone: user?.phone,
              shouldRedirect: true,
              redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(user?.phone)}`,
            })
            toast.info(t('We are redirecting you to an sms confirmation page!'))
            return
          }
        }
      }
    }

    handleAuthChange()
  }, [dispatch, sendOTP, session, status, t])

  return <>{children}</>
}

export default memo(AuthListener)
