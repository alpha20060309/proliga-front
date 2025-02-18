import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { setUserTable } from '../../../lib/features/auth/auth.slice'
import { useTranslation } from 'react-i18next'

export const useUpdateUserGeo = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const updateUserGeo = useCallback(
    async ({ id, geo, agent }) => {
      // eslint-disable-next-line no-undef
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
      setIsLoading(false)

      if (!id) {
        setError('ID kirilmagan')
        toast.error(t('ID kiritilmagan'), { theme: 'dark' })
        return
      }
      if (!geo) {
        setError('Geo kirilmagan')
        toast.error(t('Geo kirilmagan'), { theme: 'dark' })
        return
      }
      if (!agent) {
        setError('Agent kirilmagan')
        toast.error(t('Agent kirilmagan'), { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('user')
          .update({ geo: JSON.stringify(geo), agent: JSON.stringify(agent) })
          .eq('guid', id)
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
  return { updateUserGeo, isLoading, error, data }
}
