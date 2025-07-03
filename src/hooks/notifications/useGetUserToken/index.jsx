import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export const useGetUserToken = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const getUserToken = useCallback(
    async (userId, fingerprint) => {
      setIsLoading(true)
      setError(null)

      if (!userId || !fingerprint) {
        const error = 'User ID and fingerprint are required'
        setError(error)
        toast.error(error)
        setIsLoading(false)
        return
      }

      try {
        const { data: userToken, error } = await supabase
          .from('user_token')
          .select('*')
          .eq('user_id', userId)
          .eq('fingerprint', fingerprint)
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
              : t('An unknown error occurred')
          )
          return
        }

        setData(userToken)
      } catch (error) {
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
      } finally {
        setIsLoading(false)
      }
    },
    [t]
  )

  return { getUserToken, isLoading, error, data }
}
