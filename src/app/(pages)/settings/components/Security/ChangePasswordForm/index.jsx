'use client'

import { useState, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
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
        <section>
          <div className="relative sm:max-w-96">
            <Label htmlFor="newPassword">{t('Yangi parol')}</Label>
            <Input
              id="newPassword"
              name="newPassword"
              className="h-10 border-neutral-400 pr-10"
              type={showPassword ? 'text' : 'password'}
              value={password}
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
          <div className="relative sm:max-w-96">
            <Label htmlFor="confirmPassword">
              {t('Yangi parolni qayta kiriting')}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              className="h-10 border-neutral-400 pr-10"
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
        </section>
        <Button
          className="h-10 w-full rounded border border-black border-primary/75 bg-neutral-900 text-sm font-semibold text-neutral-200 transition-all hover:border-primary xs:max-w-40"
          type="submit"
          // disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="mx-auto size-5 animate-spin text-neutral-100" />
          ) : (
            t('Saqlash')
          )}
        </Button>
      </form>
    </>
  )
}

export default memo(ChangePasswordForm)
