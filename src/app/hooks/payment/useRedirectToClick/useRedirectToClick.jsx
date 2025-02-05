import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const useRedirectToClick = () => {
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const redirectToClick = useCallback(
    ({ amount, userTable }) => {
      const SERVICE_ID = process.env.NEXT_PUBLIC_CLICK_SERVICE_ID
      const MERCHANT_ID = process.env.NEXT_PUBLIC_CLICK_MERCHANT_ID
      const RETURN_URL = process.env.NEXT_PUBLIC_URL
      setIsLoading(false)
      setError(null)

      if (!userTable?.id) {
        setError('User not found')
        toast.error('User not found', { theme: 'dark' })
        return
      }

      if (!amount) {
        setError('Amount is required')
        toast.error('Amount is required', { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const url = new URL('https://my.click.uz/services/pay')
        url.searchParams.append('service_id', SERVICE_ID)
        url.searchParams.append('merchant_id', MERCHANT_ID)
        url.searchParams.append('amount', amount)
        url.searchParams.append('transaction_param', userTable?.id)
        url.searchParams.append('return_url', RETURN_URL)
        url.searchParams.append('param2', userTable?.id)

        router.push(url.href)
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
    [router, t]
  )
  return { redirectToClick, isLoading, error }
}
