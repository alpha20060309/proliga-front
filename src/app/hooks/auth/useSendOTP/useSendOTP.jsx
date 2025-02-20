import { useState, useCallback } from 'react'
import { supabase } from 'app/lib/supabaseClient'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

export const useSendOTP = () => {
  const router = useRouter()
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
    }) => {
      setIsLoading(false)
      setError(null)

      if (!phone) {
        toast.error(t('Telefon raqam kiritilmagan'), { theme: 'dark' })
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
              : t('An unknown error occurred'),
            { theme: 'dark' }
          )
          return { error }
        }
        if (data?.status !== 200) {
          setError(data?.message)
          toast.error(data?.message, { theme: 'dark' })
          return { error }
        }
        if (data?.status === 200) {
          setData(data)
          toast.success(t('SMS muvaffaqiyatli yuborildi'), { theme: 'dark' })
          if (shouldRedirect) {
            router.push(redirectTo)
          }
          return
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred'),
          { theme: 'dark' }
        )
      } finally {
        setIsLoading(false)
      }
    },
    [router, t]
  )
  return { sendOTP, isLoading, error, data }
}
