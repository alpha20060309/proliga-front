'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { PhoneInput } from 'components/PhoneInput'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetUserPhone } from 'app/hooks/user/useGetUserPhone/useGetUserPhone'
import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const ForgotPassword = ({ isModalOpen, setModalOpen }) => {
  const router = useRouter()
  const params = useSearchParams()
  const phoneParams = params.get('phone') || ''

  const { t } = useTranslation()
  const [phone, setPhone] = useState('')
  const { sendOTP, isLoading: sendLoading } = useSendOTP()
  const { getUserPhone, isLoading: tableLoading } = useGetUserPhone()
  const [verified, setVerified] = useState(false)

  const isLoading = useMemo(
    () => sendLoading || tableLoading,
    [sendLoading, tableLoading]
  )

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (!phone) {
      console.log('5')
      return toast.error(t('Telefon raqam kiritilmagan'))
    }

    await getUserPhone({
      phone,
      cb: () => setVerified(true),
    })
  }

  useEffect(() => {
    if (phoneParams && verified) {
      const fetch = async () => {
        await sendOTP({
          phone,
          shouldRedirect: true,
          redirectTo: `/confirm-otp?redirect=/reset-password&phone=${encodeURIComponent(phoneParams)}`,
        })
      }
      fetch()
      setVerified(false)
    }
  }, [router, phone, phoneParams, sendOTP, verified])

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="w-[98%] max-w-md rounded-xl bg-neutral-950 px-4 py-6 text-neutral-100 sm:p-6">
        <DialogTitle>{t('Parolingizni unutingizmi?')}</DialogTitle>
        <DialogDescription>
          {t(
            'To reset your password, please enter the OTP sent to your mobile phone. This step is required for security verification.'
          )}
        </DialogDescription>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="relative space-y-1">
            <Label htmlFor="enter-phone">{t('Telefon raqam')}:</Label>
            <PhoneInput
              id="enter-phone"
              name="phone"
              placeholder={t('Telefon raqam')}
              defaultCountry="UZ"
              className="h-10 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 w-full rounded border border-primary bg-neutral-900 text-neutral-50 transition-all hover:bg-black"
          >
            {isLoading ? (
              <Image
                src="/icons/loading.svg"
                width={24}
                height={24}
                alt="loading"
                className="mx-auto size-5 animate-spin"
              />
            ) : (
              t('Parolni tiklash')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ForgotPassword)
