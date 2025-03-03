import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useSendOTP } from '../useSendOTP/useSendOTP'

export const useAuthChangePhone = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { sendOTP } = useSendOTP()
  const { t } = useTranslation()

  const handleError = useCallback(
    (errorMessage) => {
      setError(errorMessage)
      toast.error(t(errorMessage))
    },
    [t]
  )

  // Step 5 Confirm otp for new phone
  const updatePhone = useCallback(
    async ({ new_phone, email, password, fingerprint, geo, agent, cb }) => {
      setError(null)
      setData(null)

      if (!new_phone || !email || !password) {
        handleError("Barcha maydonlar to'ldirilishi shart")
      }

      try {
        setIsLoading(true)

        // Step 1 Check Phone doesn't exist
        const { data: checkData, error: checkError } = await supabase.rpc(
          'get__check_user_not_exist',
          {
            phone_num: new_phone,
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

        // Step 2 Login to check password
        const { error: authError } = await supabase.auth.signInWithPassword({
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

        // Step 3 Set new phone to new_phone col
        const { error: fullUserError } = await supabase
          .from('user')
          .update({
            visitor: fingerprint,
            visited_at: new Date(),
            geo: JSON.stringify(geo),
            agent: JSON.stringify(agent),
            phone_new: new_phone,
          })
          .eq('email', email)
          .is('deleted_at', null)
          .single()

        if (fullUserError) {
          return handleError(
            fullUserError instanceof Error
              ? fullUserError.message
              : 'An unknown error occurred'
          )
        }
        // Step 4 Send OTP new phone
        const status = await sendOTP({ phone: new_phone, is_update: true })

        if (status?.error) {
          return handleError(status.error.message)
        }

        cb()
        return true
      } catch (error) {
        handleError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [handleError, sendOTP]
  )

  return { updatePhone, isLoading, error, data }
}
