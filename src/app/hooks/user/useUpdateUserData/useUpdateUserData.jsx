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
    async ({
      name,
      last_name,
      middle_name,
      bio,
      gender,
      birth_date,
      phone,
      differentPhone,
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
      if (!userAuth) {
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

        if (differentPhone) {
          obj = {
            ...obj,
            phone,
            phone_verified: false,
          }
          const { data: checkData, error: checkError } = await supabase.rpc(
            'get__check_user_not_exist',
            {
              phone_num: phone,
            }
          )

          if (checkError) {
            setError(
              checkError instanceof Error
                ? checkError.message
                : 'An unknown error occurred'
            )
            return toast.error(checkError.message)
          }
          if (checkData?.status === 200) {
            setError("Bu telefon raqam oldin ro'yxatdan o'tgan")
            return toast.error(t("Bu telefon raqam oldin ro'yxatdan o'tgan"))
          }
          if (checkData?.status !== 404) {
            setError('An unknown error occurred')
            return toast.error(t('An unknown error occurred'))
          }
        }

        const { data, error } = await supabase
          .from('user')
          .update(obj)
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
    [dispatch, t, userAuth]
  )
  return { updateUserData, isLoading, error }
}
