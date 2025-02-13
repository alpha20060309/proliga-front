import { useState, useCallback } from 'react'
import { supabase } from 'app/lib/supabaseClient'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

export const useConfirmOTP = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const confirmOTP = useCallback(
    async ({ code, phone, shouldRedirect = false, redirectTo = '' }) => {
      setIsLoading(false)
      setError(null)

      if (!code) {
        toast.error(t('SMS kodingizni kiriting'), { theme: 'dark' })
        setError(t('SMS kodingizni kiriting'))
        return
      }

      if (code.length !== 6) {
        toast.error(t("SMS kodingiz 6 ta raqamdan iborat bo'lishi kerak"), {
          theme: 'dark',
        })
        setError(t("SMS kodingiz 6 ta raqamdan iborat bo'lishi kerak"))
        return
      }

      if (!phone) {
        console.log('1')
        toast.error(t('Telefon raqam kiritilmagan'), { theme: 'dark' })
        setError(t('Telefon raqam kiritilmagan'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase.rpc('verify__sms_code', {
          phone_number: phone,
          confirm_code: code,
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
          return
        }
        if (data?.status === 419) {
          toast.warning(t('Kod eskirib qolgan!'), { theme: 'dark' })
          setError(t('Kod eskirib qolgan!'))
          return
        }
        if (data?.status === 400 || data?.status === 404) {
          toast.error(t('SMS kodingiz xato'), { theme: 'dark' })
          setError(t('SMS kodingiz xato'))
          return
        }
        if (data?.status !== 200) {
          setError(data?.message)
          toast.error(data?.message, { theme: 'dark' })
          return
        }
        if (data?.status === 200) {
          setData(data)
          toast.success(t('SMS muvaffaqiyatli tasdiqlandi'), { theme: 'dark' })
          if (shouldRedirect) {
            router.push(redirectTo)
          }
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
  return { confirmOTP, isLoading, error, data }
}
