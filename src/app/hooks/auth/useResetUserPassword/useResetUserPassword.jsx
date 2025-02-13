import { useRouter } from 'next/navigation'
import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

export const useResetUserPassword = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const resetUserPassword = useCallback(
    async ({
      password,
      code,
      phone,
      shouldRedirect = false,
      redirectTo = '',
    }) => {
      try {
        setIsLoading(true)
        setError(null)

        if (!phone) {
          console.log('2')
          toast.error(t('Telefon raqam kiritilmagan'), { theme: 'dark' })
          setError(t('Telefon raqam kiritilmagan'))
          return
        }

        if (password?.length < 6 || !password) {
          setError("Parol 6 ta belgidan kam bo'lmaydi")
          toast.error(t("Parol 6 ta belgidan kam bo'lmasligi kerak"), {
            theme: 'dark',
          })
        }

        if (!code) {
          toast.error(t('SMS kod bolishi shart'), { theme: 'dark' })
          setError(t('SMS Kod bolishi shart'))
          return
        }

        const { data, error } = await supabase.rpc(
          'http__reset_password_by_phone_number',
          {
            phone_number: phone,
            sms_code: code,
            new_pass: password,
          }
        )
        if (error) {
          setError(error.message)
          toast.error(error.message, { theme: 'dark' })
          return
        }
        if (data?.status === 419) {
          toast.warning(t('Kod eskirib qolgan!'), { theme: 'dark' })
          setError(t('Kod eskirib qolgan!'))
          return
        }
        if (data?.status === 404) {
          setError(t('Kiritilgan kod noto‘g‘ri.'))
          toast.error(t('Kiritilgan kod noto‘g‘ri.'), { theme: 'dark' })
          return
        }
        if (data?.status !== 200) {
          setError(data?.message)
          toast.error(data?.message, { theme: 'dark' })
          return
        }
        if (data?.status === 200) {
          setData(data)
          toast.success(t('Sizning parolingiz almashtirildi'), {
            theme: 'dark',
          })
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
  return { resetUserPassword, isLoading, error, data }
}
