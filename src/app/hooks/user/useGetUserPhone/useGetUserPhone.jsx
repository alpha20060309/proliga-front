import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useUpdateSearchParams } from 'app/hooks/system/useUpdateSearchParams/useUpdateSearchParams'

export const useGetUserPhone = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const updateParams = useUpdateSearchParams()

  const getUserPhone = useCallback(
    async ({ phone }) => {
      setIsLoading(false)
      setError(null)

      if (!phone) {
        setError('Telefon kirilmagan')
        toast.error(t('Telefon kiritilmagan'), { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('user')
          .select('phone')
          .is('deleted_at', null)
          .eq('phone', phone)
          .single()

        if (error?.code === 'PGRST116') {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(t('Bunaqa raqamli foydalanuvchi yoq'), { theme: 'dark' })
          return
        }
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
        if (data?.phone) {
          setData(data?.phone)
          updateParams('phone', data?.phone)
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
    [t, updateParams]
  )
  return { getUserPhone, isLoading, error, data }
}
