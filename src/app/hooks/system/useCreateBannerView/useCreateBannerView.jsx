import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export const useCreateBannerView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const createBannerView = useCallback(
    async ({ banner_id, userTable, geo, agent }) => {
      setIsLoading(false)
      setError(null)

      if (!userTable?.id) {
        setError('User not found')
        toast.error('User not found', { theme: 'dark' })
        return
      }

      if (!banner_id) {
        setError('Banner id is required')
        toast.error('Banner id is required', { theme: 'dark' })
        return
      }

      if (!agent || !geo) {
        setError('Agent or geo is not found')
        toast.error('Agent or geo is not found', { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const { error } = await supabase
          .from('banner_view')
          .insert({ banner_id, geo: geo, agent: agent, user_id: userTable.id })
          .is('deleted_at', null)

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
  return { createBannerView, isLoading, error }
}
