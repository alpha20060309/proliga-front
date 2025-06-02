import { supabase } from 'app/lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserThemes = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const updateUserThemes = useCallback(
    async ({ cb = () => {} }) => {
      try {
        setIsLoading(true)
        setError('')

        // if (savePreset) {
        //   const { error } = await supabase.from('theme').insert({
        //     name: presetName,
        //     user_id: userTable?.id,
        //     dark_theme: darkTheme,
        //     light_theme: lightTheme,
        //   })

        //   if (error) {
        //     setError(error)
        //   }
        // }

        cb()
        await update()
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
  return { updateUserThemes, isLoading, error }
}
