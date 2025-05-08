import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserNotificationInfo = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const updateNotificationToken = useCallback(
    async ({ notification_token, userTable, cb = () => {} }) => {
      if (!notification_token) {
        setError(t('Notification token is required'))
        return toast.warning(t('Notification token is required'), {
          theme: 'dark',
        })
      }
      if (!userTable?.id) {
        setError('User not authenticated')
        return toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
      }

      try {
        setIsLoading(true)
        setError('')

        const { data, error } = await supabase
          .from('user')
          .update({ notification_token })
          .eq('id', userTable?.id)
          .is('deleted_at', null)
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
          return { error, data }
        }

        cb()
        await update()
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
    [t, update]
  )
  return { updateNotificationToken, isLoading, error }
}
