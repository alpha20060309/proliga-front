import { useState, useCallback } from 'react'
import { supabase } from 'lib/supabaseClient'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useTransitionRouter } from 'next-view-transitions'

export const useSendOTP = () => {
  const router = useTransitionRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const sendOTP = useCallback(
    async ({
      phone,
      shouldRedirect = false,
      redirectTo = '',
      is_update = false,
      cb = () => {},
    }) => {
      setIsLoading(false)
      setError(null)

      if (!phone) {
        toast.error(t('Telefon raqam kiritilmagan'))
        setError(t('Telefon raqam kiritilmagan'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase.rpc('http__send__sms__phone', {
          phone_number: phone,
          is_update,
        })
        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          return { error }
        }
        if (data?.status !== 200) {
          setError(data?.message)
          toast.error(data?.message)
          return { error }
        }
        if (data?.status === 200) {
          setData(data)
          toast.success(t('SMS muvaffaqiyatli yuborildi'))
          if (shouldRedirect) {
            router.push(redirectTo)
          }
          cb()
          return
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          t('Currenty SMS sending is not available, please try again later')
        )
        // toast.error(
        //   error instanceof Error
        //     ? error.message
        //     : t('An unknown error occurred')
        // )
      } finally {
        setIsLoading(false)
      }
    },
    [router, t]
  )
  return { sendOTP, isLoading, error, data }
}
