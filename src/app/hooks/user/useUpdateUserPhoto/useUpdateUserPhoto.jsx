import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserPhoto = () => {
  const { update } = useSession()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const updateUserPhoto = useCallback(
    async ({ path, closeModal, userTable }) => {
      try {
        // eslint-disable-next-line no-undef
        setIsLoading(true)
        setError('')

        if (!path) {
          setError(t('Rasmni tanlang'))
          toast.warning(t('Rasmni tanlang'), { theme: 'dark' })
          return
        }

        if (!userTable?.id) {
          setError('User not authenticated')
          toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'), {
            theme: 'dark',
          })
          return
        }

        const { data, error } = await supabase
          .from('user')
          .update({
            photo: path,
          })
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
              : t('An unknown error occurred'),
            { theme: 'dark' }
          )
          return
        }
        if (data) {
          await update()
          toast.success(t('Rasm muvofaqiyatli yuklandi'), { theme: 'dark' })
          closeModal()
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
    [t, update]
  )
  return { updateUserPhoto, isLoading, error }
}
