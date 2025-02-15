'use client'

import ForgotPassword from 'components/Modals/ForgotPassword'
import SocialLogin from '../SocialLogin'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { PhoneInput } from 'components/PhoneInput'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEY } from 'app/utils/config.util'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthLogin } from 'app/hooks/auth/useAuthLogin/useAuthLogin'
import { cn } from '@/lib/utils'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { selectAgent, selectGeo } from 'app/lib/features/auth/auth.selector'
import { useGoogleLogin } from 'app/hooks/auth/useGoogleLogin/useGoogleLogin'
import Spinner from 'components/Spinner'

const LoginForm = ({ setShouldRedirect }) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const { login, isLoading } = useAuthLogin()
  const config = useSelector(selectSystemConfig)
  const { fingerprint } = useSelector((store) => store.auth)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { isLoading: isGoogleLoading } = useGoogleLogin()

  const can_send_sms =
    config[CONFIG_KEY.can_send_sms]?.value.toLowerCase() === 'true' || false
  const app_version = config[CONFIG_KEY.app_version]?.value || ''

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!phone || !password) {
      toast.error(t("Barcha maydonlar to'ldirilishi shart"))
      return
    }

    if (password.length < 6) {
      toast.error(t("Parol 6 ta belgidan kam bo'lmasligi kerak"))
      return
    }

    setShouldRedirect(false)
    await login({ phone, password, app_version, fingerprint, agent, geo })
  }
  if (isGoogleLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="flex w-full flex-col gap-4 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-8">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
          <h2 className="mb-2 text-xl font-bold text-neutral-100 md:mb-4 md:text-2xl">
            {t('Tizimga kirish_1')}
          </h2>
          <div className="relative flex flex-col gap-1">
            <label
              htmlFor="phone"
              className="text-xs text-neutral-300 md:text-base"
            >
              {t('Telefon raqam')}:
            </label>
            <PhoneInput
              id="phone"
              name="phone"
              placeholder={t('99-999-99-99')}
              defaultCountry="UZ"
              className="h-10 bg-neutral-950 text-neutral-50 placeholder:text-neutral-400"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs text-neutral-300 md:text-base"
            >
              {t('Parol')}:
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="********"
              className="auth-input pl-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock className="filter-neutral-400 absolute bottom-2.5 left-2 size-5" />
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
          <div className="my-3 flex justify-between">
            {can_send_sms && (
              <button
                type="button"
                className="cursor-pointer self-start text-sm text-neutral-400 transition-colors hover:text-neutral-100 hover:underline"
                onClick={() => setModalOpen(true)}
              >
                {t('Parolingizni unutingizmi?')}
              </button>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className={cn(
              'h-12 w-full rounded border border-yellow-400 bg-neutral-900 font-bold',
              'text-neutral-100 transition-all duration-300 hover:bg-yellow-400 hover:text-neutral-900',
              isLoading && 'bg-yellow-400 text-neutral-900'
            )}
          >
            {isLoading ? (
              <Image
                src="/icons/loading.svg"
                width={24}
                height={24}
                alt="loading"
                className="filter-black mx-auto size-6 animate-spin"
              />
            ) : (
              t('Tizimga kirish_2')
            )}
          </Button>
        </form>
        <SocialLogin setShouldRedirect={setShouldRedirect} />
      </section>
      <ForgotPassword isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </>
  )
}

export default memo(LoginForm)
