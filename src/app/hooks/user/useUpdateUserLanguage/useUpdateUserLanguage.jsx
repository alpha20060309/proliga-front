/* eslint-disable no-undef */
'use client'

import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setUserTable } from 'app/lib/features/auth/auth.slice'
import { setLanguage } from 'app/lib/features/systemLanguage/systemLanguage.slice'
import { useTranslation } from 'react-i18next'
import { LANGUAGE } from 'app/utils/languages.util'

export const useUpdateUserLanguage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { i18n } = useTranslation()

  const updateUserLanguage = useCallback(
    async ({ lang, userTable }) => {
      try {
        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
        setIsLoading(true)
        setError('')

        const { data, error } = await supabase
          .from('user')
          .update({
            language: lang,
          })
          .eq('id', userTable.id)
          .is('deleted_at', null)
          .select()

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
          dispatch(setUserTable(data[0]))
          dispatch(setLanguage(lang))
          i18n.changeLanguage(data[0]?.language ?? LANGUAGE.uz)
          localStorage.setItem(`user-table-${sbUrl}`, JSON.stringify(data[0]))
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
    [dispatch, i18n, t]
  )
  return { updateUserLanguage, isLoading, error }
}
