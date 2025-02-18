'use client'

import Image from 'next/image'
import SettingsAlert from '../Alert'
import ConfirmOTP from 'components/Modals/ConfirmOTP'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SettingsContainer } from '../Container'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useAuthUpdatePassword } from 'app/hooks/auth/useAuthChangePassword/useAuthChangePassword'
import UpdatePhoneNumber from 'components/Modals/UpdatePhoneNumber'

const ChangePasswordTab = () => {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)
  const { sendOTP } = useSendOTP()
  const { updatePassword, isLoading } = useAuthUpdatePassword()

  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isSMSVerified, setSMSVerified] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(true)

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

    if (password !== confirmPassword) {
      toast.error(t('Parollar mos kelmadi'), { theme: 'dark' })
      return
    }

    if (!isSMSVerified) {
      return toast.warning(t('Iltimos, telefon raqamingizni tasdiqlang'))
    }

    await updatePassword({
      oldPassword,
      newPassword: password,
      email: userTable?.email,
    })
  }

  const handleSendSms = async () => {
    setModalOpen(true)
    await sendOTP({ phone: userTable?.phone })
  }

  return (
    <>
      <UpdatePhoneNumber
        isModalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
      <ConfirmOTP
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        setVerificationStatus={setSMSVerified}
      />
      <SettingsContainer>
        <SettingsAlert
          message={t(
            'To change your password, you must confirm your identity using a one-time password sent via SMS.'
          )}
          actionText={t('Send')}
          onAction={handleSendSms}
        />
        <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-100">
          {t('Parol Yangilash')}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <section className="space-y-1">
            <div className="relative space-y-1 sm:max-w-96">
              <label
                className="block text-sm font-bold text-neutral-300"
                htmlFor="oldPassword"
              >
                {t('Eski parol')}
              </label>
              <Input
                disabled={!isSMSVerified}
                id="oldPassword"
                name="oldPassword"
                className="relative h-10 w-full rounded border border-neutral-500 bg-neutral-900 pl-2 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 md:text-base"
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
                  <EyeOff className="size-6 text-neutral-200" />
                ) : (
                  <Eye className="size-6 text-neutral-200" />
                )}
              </Button>
            </div>
            <div className="relative space-y-1 sm:max-w-96">
              <label
                className="block text-sm font-bold text-neutral-300"
                htmlFor="newPassword"
              >
                {t('Yangi parol')}
              </label>
              <Input
                id="newPassword"
                name="newPassword"
                className="h-10 w-full rounded border border-neutral-500 bg-neutral-900 pl-2 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 md:text-base"
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
                  <EyeOff className="size-6 text-neutral-200" />
                ) : (
                  <Eye className="size-6 text-neutral-200" />
                )}
              </Button>
            </div>
            <div className="relative space-y-1 sm:max-w-96">
              <label
                className="block text-sm font-bold text-neutral-300"
                htmlFor="confirmPassword"
              >
                {t('Yangi parolni qayta kiriting')}
              </label>
              <Input
                disabled={!isSMSVerified}
                id="confirmPassword"
                name="confirmPassword"
                className="h-10 w-full rounded border border-neutral-500 bg-neutral-900 pl-2 pr-10 text-sm text-neutral-200 placeholder:text-neutral-500 md:text-base"
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
                  <EyeOff className="size-6 text-neutral-200" />
                ) : (
                  <Eye className="size-6 text-neutral-200" />
                )}
              </Button>
            </div>
          </section>
          <Button
            className="h-10 w-full rounded border border-black bg-primary/75 text-sm font-semibold text-neutral-900 transition-all hover:bg-primary hover:bg-opacity-100 xs:max-w-48"
            type="submit"
            disabled={isLoading || !isSMSVerified}
          >
            {isLoading ? (
              <Image
                src="/icons/loading.svg"
                width={24}
                height={24}
                alt="loading"
                className="filter-black mx-auto size-5 animate-spin"
              />
            ) : (
              t('Saqlash')
            )}
          </Button>
        </form>
      </SettingsContainer>
    </>
  )
}

export default ChangePasswordTab
