import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export const useGetUserToken = () => {
    const { t } = useTranslation()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const getUserToken = useCallback(async (userId, fingerprint) => {
        setIsLoading(true)
        setError(null)
        try {
            if (!userId || !fingerprint) {
                setError('User ID and fingerprint are required')
                toast.error('User ID and fingerprint are required')
                return { error: 'User ID and fingerprint are required' }
            }

            const { data: userToken, error } = await supabase
                .from('user_token')
                .select('*')
                .eq('user_id', userId)
                .eq('fingerprint', fingerprint)
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
                return { error: error.message }
            }

            return { data: userToken }
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
        [t]
    )

    return { getUserToken, isLoading, error }
}
