import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useCreateUserTheme = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const createUserTheme = useCallback(
    async ({
      user_id,
      name,
      name_ru,
      dark_theme,
      light_theme,
      cb = () => {},
    }) => {
      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(
          // eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_URL + '/api/theme/set-user',
          {
            method: 'POST',
            body: JSON.stringify({
              user_id,
              dark_theme,
              light_theme,
            }),
          }
        )

        if (!res.ok) {
          setError(
            res.error instanceof Error
              ? res.error.message
              : t('An unknown error occurred')
          )
          toast.error(
            res.error instanceof Error
              ? res.error.message
              : t('An unknown error occurred')
          )
          return
        }

        const { data, error } = await supabase
          .from('theme')
          .insert({
            name,
            name_ru,
            user_id,
            dark_theme,
            light_theme,
          })
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
          return
        }

        cb()
        await update({
          theme_user_id: data?.id,
        })
      } catch (error) {
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
      } finally {
        setIsLoading(false)
      }
    },
    [t, update]
  )
  return { createUserTheme, isLoading, error }
}
