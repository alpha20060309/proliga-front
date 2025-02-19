'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useAuthUpdatePassword } from 'app/hooks/auth/useAuthChangePassword/useAuthChangePassword'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import Image from 'next/image'

export default function ChangePasswordForm({ isSMSVerified }) {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const { updatePassword, isLoading } = useAuthUpdatePassword()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.warning(t('Parollar mos kelmadi'), { theme: 'dark' })
      return
    }
    if (
      oldPassword.length < 6 ||
      password.length < 6 ||
      confirmPassword.length < 6
    ) {
      toast.warning(t("Parolar 6 ta belgidan kam bo'lmasligi kerak"))
      return
    }
    if (oldPassword === password) {
      toast.warning(
        t('Yangi parol eski parol bilan birhil bolishi mumkin emas'),
        {
          theme: 'dark',
        }
      )
      return
    }

    await updatePassword({
      oldPassword,
      newPassword: password,
      email: userTable?.email,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="relative space-y-1 sm:max-w-96">
        <Label
          className="block text-sm font-bold text-neutral-300"
          htmlFor="oldPassword"
        >
          {t('Eski parol')}
        </Label>
        <Input
          disabled={!isSMSVerified}
          id="oldPassword"
          name="oldPassword"
          className="h-10 pr-10"
          type={showOldPassword ? 'text' : 'password'}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute bottom-0 right-0 hover:bg-transparent"
          onClick={() => setShowOldPassword(!showOldPassword)}
        >
          {showOldPassword ? (
            <EyeOff className="h-5 w-5 text-neutral-200" />
          ) : (
            <Eye className="h-5 w-5 text-neutral-200" />
          )}
        </Button>
      </div>
      <div className="relative space-y-1 sm:max-w-96">
        <Label
          className="block text-sm font-bold text-neutral-300"
          htmlFor="newPassword"
        >
          {t('Yangi parol')}
        </Label>
        <Input
          id="newPassword"
          name="newPassword"
          className="h-10 pr-10"
          type={showPassword ? 'text' : 'password'}
          value={password}
          disabled={!isSMSVerified}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute bottom-0 right-0 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-neutral-200" />
          ) : (
            <Eye className="h-5 w-5 text-neutral-200" />
          )}
        </Button>
      </div>
      <div className="relative space-y-1 sm:max-w-96">
        <Label
          className="block text-sm font-bold text-neutral-300"
          htmlFor="confirmPassword"
        >
          {t('Yangi parolni qayta kiriting')}
        </Label>
        <Input
          disabled={!isSMSVerified}
          id="confirmPassword"
          name="confirmPassword"
          className="h-10 pr-10"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute bottom-0 right-0 hover:bg-transparent"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5 text-neutral-200" />
          ) : (
            <Eye className="h-5 w-5 text-neutral-200" />
          )}
        </Button>
      </div>
      <Button
        className="h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
        type="submit"
        // disabled={isLoading || !isSMSVerified}
      >
          <Loader className="filter-black mx-auto size-5 animate-spin" />
          {/* {true ? (
          <Loader className="filter-black mx-auto size-5 animate-spin" />
        ) : (
          t('Saqlash')
        )} */}
      </Button>
    </form>
  )
}
