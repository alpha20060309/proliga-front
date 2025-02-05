import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export const useGetPage = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const getPage = useCallback(
    async (name) => {
      setIsLoading(false)
      setError(null)

      if (!name) {
        setError('Name is required')
        toast.error('Name is required', { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('system_language')
          .select('id, name, ru, uz')
          .is('deleted_at', null)
          .eq('name', name)
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
          setData(data)
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
    [t]
  )
  return { getPage, isLoading, error, data }
}
