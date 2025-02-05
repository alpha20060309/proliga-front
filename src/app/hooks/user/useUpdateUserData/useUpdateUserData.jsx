import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserTable } from 'app/lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'
import { selectUserAuth } from 'app/lib/features/auth/auth.selector'

export const useUpdateUserData = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const userAuth = useSelector(selectUserAuth)
  const { t } = useTranslation()

  const updateUserData = useCallback(
    async (firstName, lastName, middleName, bio, gender, birthdate) => {
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
      if (!firstName) {
        setError(t('Ism kiriting'))
        toast.warning(t('Ism kiriting'), { theme: 'dark' })
        return
      }
      if (!gender) {
        setError(t('Jinsni tanlang'))
        toast.warning(t('Jinsni tanlang'), { theme: 'dark' })
        return
      }
      if (!birthdate) {
        setError(t("Tug'ilgan yilingizni kiriting"))
        toast.warning(t("Tug'ilgan yilingizni kiriting"), { theme: 'dark' })
        return
      }
      if (!userAuth) {
        setError('User not authenticated')
        toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'), {
          theme: 'dark',
        })
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const { data, error } = await supabase
          .from('user')
          .update({
            name: firstName,
            last_name: lastName,
            middle_name: middleName,
            bio,
            gender,
            birth_date: birthdate,
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
    [dispatch, t, userAuth]
  )
  return { updateUserData, isLoading, error }
}
