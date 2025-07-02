'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from '@/components/ui/dialog'
import { useConfirmOTP } from 'app/hooks/auth/useConfirmOTP'
import { useSelector } from 'react-redux'
import ResendOTP from './ResendOTP'
import { useSendOTP } from 'app/hooks/auth/useSendOTP'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { selectUser } from 'app/lib/features/auth/auth.selector'

const ConfirmOTP = ({
  isModalOpen,
  setModalOpen,
  cb = () => {},
  refreshUser = true,
  defaultHook = true,
  phone,
  is_update = false,
}) => {
  const [code, setCode] = useState('')
  const { t } = useTranslation()
  const { confirmOTP, isLoading: confirmLoading } = useConfirmOTP()
  const { isLoading: sendLoading } = useSendOTP()
  const user = useSelector(selectUser)

  const isLoading = confirmLoading || sendLoading

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.warning('Kod 6 ta harf bolishi shart!')
      return
    }
    if (defaultHook) {
      await confirmOTP({
        code,
        guid: user?.guid,
        phone,
        is_update,
        cb: () => {
          setCode('')
          setModalOpen(false)
          cb(true)
          refreshUser && fetch()
        },
      })
    } else {
      cb(code)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="bg-background text-foreground shadow-border flex w-min min-w-80 flex-col items-center justify-between gap-2 rounded-xl p-6 shadow-sm">
        <form
          onSubmit={handleConfirm}
          className="flex flex-col items-start gap-6"
        >
          <DialogTitle className="mb-0">{t('SMS Kod Tasdiqlash')}</DialogTitle>
          <div className="flex flex-col gap-4">
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <ResendOTP />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="border-primary text-foreground hover:bg-background bg-background h-10 w-full rounded-sm border transition-all"
          >
            {t('Tasdiqlash')}
          </Button>
        </form>
        <DialogDescription className="hidden">
          SMS confirmation
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmOTP
