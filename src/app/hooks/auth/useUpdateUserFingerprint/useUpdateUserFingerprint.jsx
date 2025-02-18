import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { setUserTable } from '../../../lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'

export const useUpdateUserFingerprint = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const updateUserFingerprint = useCallback(
    async ({ guid, fingerprint }) => {
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
      setIsLoading(false)
      setError(null)

      if (!guid) {
        setError('ID kirilmagan')
        toast.error(t('ID kiritilmagan'), { theme: 'dark' })
        return
      }
      if (!fingerprint) {
        setError('Fingerprint kirilmagan')
        toast.error(t('Fingerprint kiritilmagan'), { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('user')
          .update({ visitor: fingerprint, visited_at: new Date() })
          .eq('guid', guid)
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
              : t('An unknown error occurred'),
            { theme: 'dark' }
          )
          return
        }
        if (data) {
          dispatch(setUserTable(data))
          localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(data))
          setData(data)
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
  return { updateUserFingerprint, isLoading, error, data }
}
