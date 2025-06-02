'use client'

import { useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import ConfirmOTP from 'components/Modals/ConfirmOTP'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { resetPassword } from 'app/actions/resetPassword.action'

function ChangePasswordForm() {
  const [isModalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation()

  const userTable = useSelector(selectUserTable)
  const { sendOTP } = useSendOTP()
  const isLoading = false

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return toast.warning(t('Parollar mos kelmadi'))
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      return toast.warning(t("Parolar 6 ta belgidan kam bo'lmasligi kerak"))
    }
    await sendOTP({ phone: userTable?.phone })
    setModalOpen(true)
  }

  return (
    <>
      <ConfirmOTP
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        defaultHook={false}
        cb={(code) => {
          const res = resetPassword({ phone: userTable?.phone, code, password })

          if (res?.error) {
            return toast.error(t(res?.error))
          }
          toast.success(t("Parol o'zgartirildi"))
          setModalOpen(false)
        }}
        phone={userTable?.phone}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-1 sm:max-w-96"
      >
        <div className="relative space-y-2 sm:max-w-96">
          <Label htmlFor="newPassword">{t('Yangi parol')}</Label>
          <div className="relative space-y-1">
            <Input
              id="newPassword"
              name="newPassword"
              className="h-10 pr-10"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hover:bg-foreground/10 dark:hover:bg-foreground/10 absolute top-0.5 right-0.5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-muted-foreground hover:text-foreground size-5" />
              ) : (
                <Eye className="text-muted-foreground hover:text-foreground size-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="relative space-y-2 sm:max-w-96">
          <Label htmlFor="confirmPassword">
            {t('Yangi parolni qayta kiriting')}
          </Label>
          <div className="relative">
            <Input
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
              className="hover:bg-foreground/10 dark:hover:bg-foreground/10 absolute top-0.5 right-0.5"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="text-muted-foreground hover:text-foreground size-5" />
              ) : (
                <Eye className="text-muted-foreground hover:text-foreground size-5" />
              )}
            </Button>
          </div>
        </div>
        <Button
          className="hover:bg-accent/80 max-w-40"
          size="lg"
          variant={'outline'}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="text-foreground mx-auto size-5 animate-spin" />
          ) : (
            t('Saqlash')
          )}
        </Button>
      </form>
    </>
  )
}

export default memo(ChangePasswordForm)
