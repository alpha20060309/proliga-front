import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useLogOut } from '../useLogOut/useLogOut'
import { useDispatch } from 'react-redux'
import { setChecked, setUserTable } from 'app/lib/features/auth/auth.slice'

export const useCheckUserExists = () => {
  const dispatch = useDispatch()
  const { logOut } = useLogOut()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const checkUserExists = useCallback(
    async ({ guid }) => {
      // eslint-disable-next-line no-undef
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)

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
          .select(
            'id, guid, name, email, phone, photo, last_name, middle_name, gender, birth_date, bio, balance, deleted_at, language, phone_verified, visitor, geo, agent'
          )
          .is('deleted_at', null)
          .is('phone_verified', true)
          .eq('guid', guid)
          .single()

        if (error?.code === 'PGRST116') {
          await logOut({
            showMessage: false,
          })
          toast.error(t('Foydalanuvchi topilmadi'), { theme: 'dark' })
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
        if (data) {
          dispatch(setUserTable(data))
          dispatch(setChecked(true))
          localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(data))
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
    [logOut, t, dispatch]
  )
  return { checkUserExists, isLoading, error }
}
