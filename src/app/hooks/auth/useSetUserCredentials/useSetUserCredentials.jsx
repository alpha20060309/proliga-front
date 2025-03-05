import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useSendOTP } from '../useSendOTP/useSendOTP'
import { useSession } from 'next-auth/react'

export const useSetUserCredentials = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { update, data: session } = useSession()
  const { t } = useTranslation()
  const { sendOTP } = useSendOTP()

  const handleError = useCallback(
    (errorMessage) => {
      setIsLoading(false)
      setError(errorMessage)
      toast.error(t(errorMessage), { theme: 'dark' })
      return
    },
    [t]
  )

  const setUserCredentials = useCallback(
    async ({ phone, email, user, cb = () => {} }) => {
      setIsLoading(true)
      setError(null)
      setData(null)

      if (!phone || !user?.id || !email) {
        handleError("Barcha maydonlar to'ldirilishi shart")
        return
      }
      console.log(email, phone)
      try {
        // Step 1: Check that the phone doesn't exist
        if (!session?.user?.email) {
          const { data: phoneData, error: phoneError } = await supabase.rpc(
            'get__check_user_not_exist',
            {
              phone_num: phone,
            }
          )

          if (phoneError) {
            return handleError(
              phoneError instanceof Error
                ? phoneError.message
                : 'An unknown error occurred'
            )
          }

          if (phoneData?.status === 200) {
            return handleError("Bu telefon raqam oldin ro'yxatdan o'tgan")
          }
          if (phoneData?.status !== 404) {
            return handleError('An unknown error occurred')
          }
        }
        // Step 2: Check that the email doesn't exist
        if (!session?.user?.email) {
          const { data: emailData, error: emailError } = await supabase.rpc(
            'get__check_user_email_not_exist',
            {
              i_email: email,
            }
          )

          if (emailError) {
            return handleError(
              emailError instanceof Error
                ? emailError.message
                : 'An unknown error occurred'
            )
          }

          if (emailData?.status === 200) {
            return handleError("Bu email raqam oldin ro'yxatdan o'tgan")
          }

          if (emailData?.status !== 404) {
            return handleError('An unknown error occurred')
          }
        }

        // Step 3: Update user table
        const { error: fullUserError } = await supabase

          .from('user')
          .update({
            email,
            phone,
            isOAuth: true,
          })
          .eq('id', user?.id)
          .is('deleted_at', null)
          .single()

        if (fullUserError) {
          return handleError(
            fullUserError instanceof Error
              ? fullUserError.message
              : 'An unknown error occurred'
          )
        }

        // Step 4: Send OTP and redirect to confirmation page
        await update()
        setData(user)
        toast.info(t('Please confirm your phone number to complete sign up!'))
        await sendOTP({
          phone,
          shouldRedirect: true,
          redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(phone)}`,
        })
        cb()
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
    [sendOTP, handleError, t, update, session?.user]
  )

  return { setUserCredentials, isLoading, error, data }
}
