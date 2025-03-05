'use client'

import { useTranslation } from 'react-i18next'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Lock, Loader2 } from 'lucide-react'
import { resetPassword } from 'app/actions/resetPassword.action'
import { useTransition } from 'react'

const ResetPasswordForm = () => {
  const router = useRouter()
  const params = useSearchParams()
  const phone = decodeURIComponent(params.get('phone')) || ''
  const code = params.get('code') || ''
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6 || confirmPassword.length < 6) {
      return toast.warning(t("Parolar 6 ta belgidan kam bo'lmasligi kerak"))
    }
    if (password !== confirmPassword) {
      return toast.warning(t('Parollar mos kelmadi'))
    }

    startTransition(async () => {
      const res = await resetPassword({
        phone,
        code,
        password,
      })

      if (res?.error) {
        return toast.error(t(res.error))
      }
      if (res?.success) {
        toast.success('The pass has changed')
        router.push('/auth')
      }
    })
  }

  useEffect(() => {
    if (!phone || !code) {
      router.push('/auth')
    }
  }, [phone, code, router])

  return (
    <div className="bg-background mx-auto w-full max-w-md space-y-8 rounded-lg border border-neutral-800 p-6 shadow shadow-neutral-600">
      <div className="flex items-center gap-2">
        <Lock className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">{t('Parol Yangilash')}</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="space-y-1">
          <label
            htmlFor="newPassword"
            className="text-muted-foreground text-sm font-medium"
          >
            {t('Yangi parol')}
          </label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="size-6 text-neutral-200" />
              ) : (
                <Eye className="size-6 text-neutral-200" />
              )}
            </Button>
          </div>
        </div>
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-muted-foreground text-sm font-medium"
          >
            {t('Yangi parolni qayta kiriting')}
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="size-6 text-neutral-200" />
              ) : (
                <Eye className="size-6 text-neutral-200" />
              )}
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          className="mt-4 h-12 w-full rounded border border-yellow-400 bg-neutral-900 font-bold text-neutral-100 transition-all duration-300 hover:bg-yellow-400 hover:text-neutral-900"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-8 animate-spin text-white" />
          ) : (
            t('Parol Yangilash')
          )}
        </Button>
      </form>
    </div>
  )
}

export default ResetPasswordForm
