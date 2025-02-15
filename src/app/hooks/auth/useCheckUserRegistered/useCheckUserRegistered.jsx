import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'

export const useCheckUserRegistered = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const checkUserRegistered = useCallback(
    async ({ guid }) => {
      setIsLoading(false)
      setError(null)

      if (!guid) {
        setError('User not authenticated')
        toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'), {
          theme: 'dark',
        })
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('user')
          .select('guid, phone, phone_verified')
          .is('deleted_at', null)
          .eq('guid', guid)
          .single()

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
        if (data) {
          if (!data?.phone) {
            dispatch(setPhoneModal(true))
          }
          setData(data)
          return data
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
    [t, dispatch]
  )
  return { checkUserRegistered, isLoading, error, data }
}
