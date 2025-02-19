import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { setUserAuth } from '../../../lib/features/auth/auth.slice'

export const useAuthChangePhone = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleError = useCallback(
    (errorMessage) => {
      setError(errorMessage)
      toast.error(t(errorMessage))
    },
    [t]
  )

  const setState = useCallback(
    (userData) => {
      setData(userData)
      dispatch(setUserAuth(userData))
      // eslint-disable-next-line no-undef
      const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
      localStorage.setItem(`user-auth-${sbUrl}`, JSON.stringify(userData))
    },
    [dispatch]
  )

  // Step 1 Check Phone doesn't exist
  // Step 2 Login to check Pass
  // Step 3 Set new phone to new_phone col
  // Step 4 Send OTP new phone

  // Step 5 Confirm otp for new phone

  const updatePhone = useCallback(
    async ({ new_phone, email, password }) => {
      setError(null)
      setData(null)

      if (!new_phone || !email || !password) {
        handleError("Barcha maydonlar to'ldirilishi shart")
      }

      try {
        setIsLoading(true)
        // First verify the old password

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

  return { updatePhone, isLoading, error, data }
}
