import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { PAYMENT_OPTIONS } from 'app/utils/paymentOptions.util'
import { useRouter } from 'next/navigation'

export const useBuyPackageWithWallet = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()
  const router = useRouter()

  const buyPackageWithWallet = useCallback(
    async ({ team_id, package_id }) => {
      setIsLoading(false)
      setError(null)

      if (!team_id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'), { theme: 'dark' })
      }
      if (!package_id) {
        setError('Package not found')
        toast.error(t('Paket topilmadi'), { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('pay_expense')
          .insert({
            team_id,
            pay_package_id: package_id,
            system: PAYMENT_OPTIONS.WALLET,
            status: 1,
            transaction_id: btoa(Date.now() + team_id + PAYMENT_OPTIONS.WALLET),
          })
          .select()
          .is('deleted_at', null)
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
          setData(data)
          toast.success(t('Siz mufaqiyatli paket sotib olindigiz'), {
            theme: 'dark',
          })
          router.push('/championships')
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
    [router, t]
  )
  return { buyPackageWithWallet, isLoading, error, data }
}
