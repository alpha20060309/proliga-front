'use client'

import { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import ResendOTPBox from '../ResendOTPBox'
import { useTranslation } from 'react-i18next'
import { useConfirmOTP } from 'app/hooks/auth/useConfirmOTP/useConfirmOTP'
import { Button } from '@/components/ui/button'
import { Loader2, ShieldCheck } from 'lucide-react'
import { toast } from 'react-toastify'

const ConfirmOTPForm = ({ redirect, phone }) => {
  const { t } = useTranslation()
  const [code, setCode] = useState('')
  const { confirmOTP, isLoading } = useConfirmOTP()

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.warning('Kod 6 ta harf bolishi shart!')
      return
    }

    await confirmOTP({
      code,
      phone,
      shouldRedirect: true,
      redirectTo: redirect + `?phone=${encodeURIComponent(phone)}&code=${code}`,
    })
    setCode('')
  }

  return (
    <div className="bg-background mx-auto w-full max-w-md space-y-8 rounded-lg border border-neutral-800 p-6 shadow shadow-neutral-600">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">{t('SMS Kod Tasdiqlash')}</h1>
      </div>
      <form onSubmit={handleConfirm} className="flex flex-col gap-2">
        <div className="space-y-1">
          <label
            htmlFor="phone"
            className="text-muted-foreground text-sm font-medium"
          >
            {t('Telefon raqam')}:
          </label>
          <div
            id="phone"
            className="bg-muted text-foreground rounded-md border px-3 py-2"
          >
            {phone}
          </div>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="otp"
            className="text-muted-foreground text-sm font-medium"
          >
            {t('Tasdiqlash kodini kiriting.')}
          </label>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
            id="otp"
          >
            <InputOTPGroup className="w-full justify-between">
              <InputOTPSlot index={0} className="rounded-lg" />
              <InputOTPSlot index={1} className="rounded-lg" />
              <InputOTPSlot index={2} className="rounded-lg" />
              <InputOTPSlot index={3} className="rounded-lg" />
              <InputOTPSlot index={4} className="rounded-lg" />
              <InputOTPSlot index={5} className="rounded-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <ResendOTPBox phone={phone} className={'my-2'} />
        <Button
          type="submit"
          className="h-12 w-full rounded border border-yellow-400 bg-neutral-900 font-bold text-neutral-100 transition-all duration-300 hover:bg-yellow-400 hover:text-neutral-900"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-8 animate-spin text-white" />
          ) : (
            t('Tasdiqlash')
          )}
        </Button>
      </form>
    </div>
  )
}

export default ConfirmOTPForm
