import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserTable } from 'app/lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'

export const useUpdateUserData = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const updateUserData = useCallback(
    async ({
      name,
      last_name,
      middle_name,
      bio,
      gender,
      birth_date,
      userTable,
      cb = () => {},
    }) => {
      // eslint-disable-next-line no-undef
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
      if (!name) {
        setError(t('Ism kiriting'))
        return toast.warning(t('Ism kiriting'), { theme: 'dark' })
      }
      if (!gender) {
        setError(t('Jinsni tanlang'))
        return toast.warning(t('Jinsni tanlang'), { theme: 'dark' })
      }
      if (!birth_date) {
        setError(t("Tug'ilgan yilingizni kiriting"))
        return toast.warning(t("Tug'ilgan yilingizni kiriting"))
      }
      if (!userTable) {
        setError('User not authenticated')
        return toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
      }

      try {
        setIsLoading(true)
        setError('')

        let obj = {
          name,
          last_name,
          middle_name,
          bio,
          gender,
          birth_date,
        }

        const { data, error } = await supabase
          .from('user')
          .update(obj)
          .eq('guid', userTable?.id)
          .is('deleted_at', null)
          .select(
            'id, guid, name, email, phone, photo, last_name, middle_name, gender, birth_date, bio, balance, deleted_at, language, phone_verified, visitor, geo, agent'
          )
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
        if (data) {
          dispatch(setUserTable(data))
          localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(data))
          cb()
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
  return { updateUserData, isLoading, error }
}
