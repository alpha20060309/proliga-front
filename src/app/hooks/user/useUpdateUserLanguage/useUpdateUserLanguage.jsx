'use client'

import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserTable } from 'app/lib/features/auth/auth.slice'
import { setLanguage } from 'app/lib/features/systemLanguage/systemLanguage.slice'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserLanguage = () => {
  const { update } = useSession()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { i18n } = useTranslation()

  const updateUserLanguage = useCallback(
    async ({ lang, userTable }) => {
      try {
        // eslint-disable-next-line no-undef
        setIsLoading(true)
        setError('')

        const { data, error } = await supabase
          .from('user')
          .update({
            language: lang,
          })
          .eq('id', userTable.id)
          .is('deleted_at', null)

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
          // dispatch(
          //   setLanguage({ lang, cb: (lang) => i18n.changeLanguage(lang) })
          // )
          await update()
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
    [dispatch, i18n, t, update]
  )
  return { updateUserLanguage, isLoading, error }
}
