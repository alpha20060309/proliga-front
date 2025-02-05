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

export const useAuthRegister = () => {
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

  const register = useCallback(
    async ({
      phone,
      email,
      password,
      geo,
      fingerprint,
      agent,
      app_version,
    }) => {
      setIsLoading(true)
      setError(null)
      setData(null)

      if (!phone || !email || !password) {
        handleError("Barcha maydonlar to'ldirilishi shart")
        return
      }

      if (password.length < 6) {
        handleError("Parol 6 ta belgidan kam bo'lmasligi kerak")
        return
      }

      try {
        // Step 1: Check that the user doesn't exist
        const { data: checkData, error: checkError } = await supabase.rpc(
          'get__check_user_not_exist',
          {
            phone_num: phone,
          }
        )

        if (checkError) {
          return handleError(
            checkError instanceof Error
              ? checkError.message
              : 'An unknown error occurred'
          )
        }
        if (checkData?.status === 200) {
          return handleError("Bu telefon raqam oldin ro'yxatdan o'tgan")
        }
        if (checkData?.status !== 404) {
          return handleError('An unknown error occurred')
        }

        // Step 2: Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp(
          {
            email,
            password,
          }
        )

        if (authError?.code === 'user_already_exists') {
          return handleError("Bu foydalanuvchi allaqachon ro'yxatdan o'tgan")
        }

        if (authError) {
          return handleError(
            authError instanceof Error
              ? authError.message
              : 'An unknown error occurred'
          )
        }

        if (!authData?.user?.id) {
          return handleError('An unknown error occurred')
        }

        // Step 3: Update user table
        const { data: fullUserData, error: fullUserError } = await supabase
          .from('user')
          .update({
            phone,
            visitor: fingerprint,
            visited_at: new Date(),
            geo: JSON.stringify(geo),
            agent: JSON.stringify(agent),
          })
          .eq('guid', authData.user.id)
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

        // Step 4: Send OTP and redirect to confirmation page
        setState({ authData: authData?.user, fullUserData })
        localStorage.setItem('app_version', app_version)
        toast.info(t('Please confirm your phone number to complete sign up!'), {
          theme: 'dark',
        })
        await sendOTP({
          phone,
          shouldRedirect: true,
          redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(phone)}`,
        })
      } catch (error) {
        handleError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [sendOTP, setState, handleError, t]
  )

  return { register, isLoading, error, data }
}
