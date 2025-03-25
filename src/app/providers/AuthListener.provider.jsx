'use client'

import { useEffect, memo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { toast } from 'react-toastify'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

function AuthListener({ children }) {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sendOTP } = useSendOTP()
  const { data: session, status } = useSession()
  const [active, setActive] = useState(true)

  useEffect(() => {
    const handleAuthChange = async () => {
      if (status === 'authenticated' && session?.user) {
        const { user } = session

        const app_version = JSON.parse(localStorage.getItem('config'))
          ?.app_version?.value
        const SIGN_IN_METHOD = localStorage.getItem('sign-in-method')

        if (!user?.id || !SIGN_IN_METHOD || !active) {
          return
        }

        if (!user?.email || !user?.phone) {
          dispatch(setPhoneModal(true))
          setActive(false)
          return
        }
        if (!user?.phone_verified && user?.phone && user?.email) {
          setActive(false)
          localStorage.setItem('app_version', app_version)
          await sendOTP({
            phone: user?.phone,
            shouldRedirect: false,
            redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(user?.phone)}`,
          })
          toast.info(t('We are redirecting you to an sms confirmation page!'))
          router.push(
            `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(user?.phone)}`
          )
          return
        }
        if (user?.email && user?.phone && user?.phone_verified) {
          setActive(false)
          toast.success(t('Tizimga muvaffaqiyatli kirdingiz'))
          localStorage.removeItem('sign-in-method')
          return router.push('/championships')
        }
      }
    }

    handleAuthChange()
  }, [dispatch, status, t, router, active, sendOTP, session])

  return <>{children}</>
}

export default memo(AuthListener)
