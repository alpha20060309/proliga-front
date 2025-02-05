import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserTable } from 'app/lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'

export const useRefreshUserTable = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const refreshUserTable = useCallback(
    async (guid) => {
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)

      if (!guid) {
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
          .select('*')
          .eq('guid', guid)
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
    [dispatch, t]
  )
  return { refreshUserTable, isLoading, error }
}
