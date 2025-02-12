'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/utils'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

export default function ResendOTP() {
  const { sendOTP } = useSendOTP()
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const [countdown, setCountdown] = useState(60)
  const [isResendEnabled, setIsResendEnabled] = useState(false)

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else {
      setIsResendEnabled(true)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleClick = async () => {
    await sendOTP({ phone: userTable?.phone })
    setCountdown(60)
    setIsResendEnabled(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        disabled={!isResendEnabled}
        type="button"
        onClick={handleClick}
        className={cn(
          'h-7 border bg-transparent px-2 text-xs',
          isResendEnabled
            ? 'text-primary hover:text-primary/70'
            : 'text-neutral-300'
        )}
      >
        <Image
          src="./icons/resend.svg"
          alt="swap"
          height="20"
          width="20"
          className={cn(
            'mr-1.5 size-5',
            isResendEnabled ? 'filter-primary' : 'filter-neutral-300'
          )}
        />
        {t('Qayta jo‘natish')}
      </Button>
      {!isResendEnabled && (
        <div className="text-sm text-neutral-200">{countdown}s</div>
      )}
    </div>
  )
}
