import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserTable } from 'app/lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'

export const useUpdateUserPhoto = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const updateUserPhoto = useCallback(
    async ({ path, closeModal, userTable, userAuth }) => {
      try {
        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
        setIsLoading(true)
        setError('')

        if (!path) {
          setError(t('Rasmni tanlang'))
          toast.warning(t('Rasmni tanlang'), { theme: 'dark' })
          return
        }

        if (!userAuth || !userTable) {
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
          .eq('guid', userAuth?.id)
          .is('deleted_at', null)
          .select()
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
          dispatch(setUserTable(data))
          localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(data))
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
    [dispatch, t]
  )
  return { updateUserPhoto, isLoading, error }
}
