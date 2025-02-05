import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const useBuyPackageWithPayme = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const buyPackageWithPayme = useCallback(
    ({ userTable, currentPackage, currentTeam, lang }) => {
      const RETURN_URL = process.env.NEXT_PUBLIC_URL
      setIsLoading(false)
      setError(null)

      if (!userTable?.id) {
        setError('User not found')
        toast.error('User not found', { theme: 'dark' })
        return
      }
      if (!currentTeam?.id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'), { theme: 'dark' })
      }
      if (!currentPackage || !currentPackage?.price) {
        setError(t('Joriy paket yo‘q!'))
        toast.error(t('Joriy paket yo‘q!'), { theme: 'dark' })
        return
      }

      try {
        setIsLoading(true)

        const url = new URL('https://checkout.paycom.uz')
        const m = process.env.NEXT_PUBLIC_PAYME_EXPENSE_ID // merchant id
        const a = currentPackage?.price // amount
        const l = lang
        const cr = 4217 // UZS
        const ct = 15000 // Millinseconds to wait
        const encoded = btoa(
          `m=${m};ac.team_id=${currentTeam?.id};ac.package_id=${currentPackage?.id};a=${a};l=${l};c=${RETURN_URL};ct=${ct};cr=${cr};`
        )
        router.push(url.href + encoded)
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
  return { buyPackageWithPayme, isLoading, error }
}
