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

export const useAuthLogin = () => {
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
    async ({ phone, password, geo, fingerprint, agent, app_version }) => {
      setIsLoading(true)
      setError(null)
      setData(null)

      if (!phone || !password) {
        handleError("Barcha maydonlar to'ldirilishi shart")
        return
      }

      if (password.length < 6) {
        handleError("Parol 6 ta belgidan kam bo'lmasligi kerak")
        return
      }

      try {
        // Step 1: Check User Exists
        if (!phone) {
          return handleError('Email yoki Telefon kiritilmagan')
        }

        const { data: checkData, error: checkError } = await supabase
          .from('user')
          .select('phone, email')
          .eq('phone', phone)
          .is('deleted_at', null)
          .single()

        const email = checkData?.email || ''

        if (checkError?.code === 'PGRST116') {
          return handleError('Bunaqa raqamli foydalanuvchi yoq')
        }
        if (checkError) {
          return handleError(
            checkError instanceof Error
              ? checkError.message
              : 'An unknown error occurred'
          )
        }

        if (!email.includes('@')) {
          handleError("Elektron pochta manzili notog'ri kiritildi")
          return
        }

        // Step 2: Log in with supabase
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email,
            password,
          })

        if (authError?.code === 'invalid_credentials') {
          return handleError('Login yoki parol xato')
        }
        if (authError) {
          return handleError(
            authError instanceof Error
              ? authError.message
              : 'An unknown error occurred'
          )
        }

        // Step 3: Get user table data & Update geo
        const { data: fullUserData, error: fullUserError } = await supabase
          .from('user')
          .update({
            visitor: fingerprint,
            visited_at: new Date(),
            geo: JSON.stringify(geo),
            agent: JSON.stringify(agent),
          })
          .eq('phone', phone)
          .is('deleted_at', null)
          .select('*')
          .single()

        if (fullUserError) {
          return handleError(
            fullUserError instanceof Error
              ? fullUserError.message
              : 'An unknown error occurred'
          )
        }

        // Step 4: If user not verified verify it!
        if (!fullUserData.phone_verified) {
          setState({ authData: authData?.user, fullUserData })
          toast.warning(t('Sizning raqamingiz tasdiqlanmagan'), {
            theme: 'dark',
          })
          toast.info(t('We are redirecting you to an sms confirmation page!'), {
            theme: 'dark',
          })
          return await sendOTP({
            phone,
            shouldRedirect: true,
            redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(phone)}`,
          })
        }

        setState({ authData: authData?.user, fullUserData })
        toast.success(t('Tizimga muvaffaqiyatli kirdingiz'))
        localStorage.setItem('app_version', app_version)
        router.push('/championships')
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
