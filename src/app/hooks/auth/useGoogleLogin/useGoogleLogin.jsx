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
    ({ table, auth, app_version }) => {
      // eslint-disable-next-line no-undef
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)

      setData({ table: table, auth: auth })
      dispatch(setUserAuth(auth))
      dispatch(setUserTable(table))
      localStorage.setItem(`user-auth-${sbUrl}`, JSON.stringify(auth))
      localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(table))
      localStorage.removeItem('sign-in-method')
      app_version && localStorage.setItem('app_version', app_version)
    },
    [dispatch]
  )

  const login = useCallback(
    async ({ auth, geo, agent, fingerprint, app_version }) => {
      setIsLoading(true)
      setError(null)
      setData(null)

      if (!auth?.id) {
        handleError('ID kirilmagan')
      }

      try {
        // Step 1: Get user table data
        const { data: table, error: fullUserError } = await supabase
          .from('user')
          .update({
            visitor: fingerprint,
            visited_at: new Date(),
            geo: JSON.stringify(geo),
            agent: JSON.stringify(agent),
          })
          .eq('guid', auth?.id)
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

        // Step 2: If user not verified verify it!
        if (!table.phone_verified) {
          setState({ auth, table, app_version })
          app_version && localStorage.setItem('app_version', app_version)
          toast.warning(t('Sizning raqamingiz tasdiqlanmagan'), {
            theme: 'dark',
          })
          toast.info(t('We are redirecting you to an sms confirmation page!'), {
            theme: 'dark',
          })
          await sendOTP({
            phone: table?.phone,
            shouldRedirect: true,
            redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(table?.phone)}`,
          })
          return
        }
        setState({ auth, table, app_version })
        toast.success(t('Tizimga muvaffaqiyatli kirdingiz'))
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
