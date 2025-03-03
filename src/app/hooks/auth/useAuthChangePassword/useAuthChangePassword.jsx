import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export const useAuthUpdatePassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const handleError = useCallback(
    (errorMessage) => {
      setError(errorMessage)
      toast.error(t(errorMessage))
    },
    [t]
  )

  const setState = useCallback((userData) => {
    setData(userData)
  }, [])

  const updatePassword = useCallback(
    async ({ oldPassword, newPassword, email }) => {
      setError(null)
      setData(null)

      if (!oldPassword || !newPassword) {
        return handleError("Barcha maydonlar to'ldirilishi shart")
      }

      if (oldPassword.length < 6 || newPassword.length < 6) {
        return handleError("Parol 6 ta belgidan kam bo'lmasligi kerak")
      }

      if (oldPassword === newPassword) {
        return handleError(
          'Yangi parol eski parol bilan birhil bolishi mumkin emas'
        )
      }

      if (!email) {
        handleError('Please login first')
        return
      }

      try {
        setIsLoading(true)
        // First verify the old password
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: oldPassword,
        })

        if (signInError) {
          handleError("Eski parol noto'g'ri")
          setIsLoading(false)
          return
        }

        // If old password is correct, update to new password
        const { data: userData, error: updateError } =
          await supabase.auth.updateUser({
            password: newPassword,
          })

        if (updateError) {
          handleError(
            updateError instanceof Error
              ? updateError.message
              : 'An unknown error occurred'
          )
          return
        }

        if (userData) {
          setState(userData?.user)
          toast.success(t('Sizning Parolingiz Almashdi'))
        }
        return true
      } catch (error) {
        handleError(
          error instanceof Error ? error.message : 'An unknown error occurred'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [t, handleError, setState]
  )

  return { updatePassword, isLoading, error, data }
}
