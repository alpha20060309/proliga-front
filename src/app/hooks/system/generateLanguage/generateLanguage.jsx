import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export const useGenerateLanguage = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  const generate = useCallback(async () => {
    setIsLoading(false)
    setError(null)

    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('system_language')
        .select('id, name, ru, uz, is_exclude')
        .is('deleted_at', null)
        .order('id')

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
        let uz = {}
        let ru = {}
        // uz
        data.map((item) => {
          if (!item?.is_exclude) {
            uz = { ...uz, [item.name]: item.uz }
          }
        })
        // ru
        data.map((item) => {
          if (!item?.is_exclude) {
            ru = { ...ru, [item.name]: item.ru }
          }
        })
        console.log('ru', ru)
        console.log('uz', uz)
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('An unknown error occurred')
      )
      toast.error(
        error instanceof Error ? error.message : t('An unknown error occurred'),
        { theme: 'dark' }
      )
    } finally {
      setIsLoading(false)
    }
  }, [t])
  return { generate, isLoading, error, data }
}
