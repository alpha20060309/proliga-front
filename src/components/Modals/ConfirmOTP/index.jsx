'use client'

import { useEffect, useState } from 'react'
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
import { useConfirmOTP } from 'app/hooks/auth/useConfirmOTP/useConfirmOTP'
import { useSelector } from 'react-redux'
import ResendOTP from './ResendOTP'
import { useRefreshUserTable } from 'app/hooks/user/useRefreshUserTable/useRefreshUserTable'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { Button } from '@/components/ui/button'
import { toast } from 'react-toastify'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const ConfirmOTP = ({
  isModalOpen,
  setModalOpen,
  setVerificationStatus = () => {},
  refreshUser = true,
}) => {
  const [code, setCode] = useState('')
  const { t } = useTranslation()
  const { confirmOTP, isLoading: confirmLoading, error, data } = useConfirmOTP()
  const { isLoading: sendLoading } = useSendOTP()
  const userTable = useSelector(selectUserTable)
  const { refreshUserTable, isLoading: refreshLoading } = useRefreshUserTable()

  const isLoading = confirmLoading || sendLoading || refreshLoading

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.warning('Kod 6 ta harf bolishi shart!', { theme: 'dark' })
      return
    }

    await confirmOTP({ code, guid: userTable?.guid, phone: userTable?.phone })
  }

  useEffect(() => {
    if (!confirmLoading && !error && data?.status === 200) {
      const fetch = async () => {
        await refreshUserTable(userTable?.guid)
      }

      setCode('')
      setModalOpen(false)
      setVerificationStatus(true)
      refreshUser && fetch()
    }
  }, [
    confirmLoading,
    error,
    data,
    refreshUserTable,
    userTable,
    setModalOpen,
    setVerificationStatus,
    refreshUser,
  ])

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="flex w-min min-w-80 flex-col items-center justify-between gap-2 rounded-xl bg-neutral-950 p-6 text-neutral-100 shadow shadow-neutral-500">
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
            className="h-10 w-full rounded border border-primary bg-neutral-900 text-neutral-100 transition-all hover:bg-black"
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
