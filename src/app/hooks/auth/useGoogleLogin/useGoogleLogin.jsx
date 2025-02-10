/* eslint-disable no-undef */
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import {
  setUserAuth,
  setUserTable,
} from '../../../lib/features/auth/auth.slice'
import { useSendOTP } from '../useSendOTP/useSendOTP'
import { useRouter } from 'next/navigation'

export const useGoogleLogin = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sendOTP } = useSendOTP()

  const handleError = useCallback(
    (errorMessage) => {
      setError(errorMessage)
      toast.error(t(errorMessage), { theme: 'dark' })
      localStorage.clear()
      dispatch(setUserAuth(null))
      dispatch(setUserTable(null))
    },
    [t, dispatch]
  )

  const setState = useCallback(
    ({ fullUserData, authData }) => {
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)

      setData({ table: fullUserData, auth: authData })
      dispatch(setUserAuth(authData))
      dispatch(setUserTable(fullUserData))
      localStorage.setItem(`user-auth-${sbUrl}`, JSON.stringify(authData))
      localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(fullUserData))
    },
    [dispatch]
  )

  const login = useCallback(
    async ({ auth }) => {
      setIsLoading(true)
      setError(null)
      setData(null)

      // if (!phone || !password) {
      //   handleError("Barcha maydonlar to'ldirilishi shart")
      //   return
      // }

      // if (password.length < 6) {
      //   handleError("Parol 6 ta belgidan kam bo'lmasligi kerak")
      //   return
      // }

      try {
        console.log(auth)
        // Step 3: Get user table data
        // const { data: fullUserData, error: fullUserError } = await supabase
        //   .from('user')
        //   .select('*')
        //   .eq('phone', phone)
        //   .is('deleted_at', null)
        //   .single()
        // if (fullUserError) {
        //   return handleError(
        //     fullUserError instanceof Error
        //       ? fullUserError.message
        //       : 'An unknown error occurred'
        //   )
        // }
        // // Step 4: If user not verified verify it!
        // if (!fullUserData.phone_verified) {
        //   setState({ authData: authData?.user, fullUserData })
        //   toast.warning(t('Sizning raqamingiz tasdiqlanmagan'), {
        //     theme: 'dark',
        //   })
        //   toast.info(t('We are redirecting you to an sms confirmation page!'), {
        //     theme: 'dark',
        //   })
        //   return await sendOTP({
        //     phone,
        //     shouldRedirect: true,
        //     redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(phone)}`,
        //   })
        // }
        // setState({ authData: authData?.user, fullUserData })
        // localStorage.setItem('app_version', app_version)
        // router.push('championships')
      } catch (error) {
        handleError(error.message || 'An unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    },
    [handleError, sendOTP, setState, router, t]
  )

  return { login, isLoading, error, data }
}
