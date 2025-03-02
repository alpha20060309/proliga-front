'use client'

import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserLanguage = () => {
  const { update } = useSession()
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

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
    [t, update]
  )
  return { updateUserLanguage, isLoading, error }
}
