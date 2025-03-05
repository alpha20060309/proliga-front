'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { PhoneInput } from 'components/PhoneInput'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { CONFIG_KEY } from 'app/utils/config.util'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { selectAgent, selectGeo } from 'app/lib/features/auth/auth.selector'
import { isEmail } from 'validator'
import { cn } from '@/lib/utils'
import { memo } from 'react'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import SocialLogin from '../SocialLogin'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { register } from 'app/actions/register.action'

const SignUpForm = ({ setShouldRedirect }) => {
  const { t } = useTranslation()
  const { update } = useSession()
  const { fingerprint } = useSelector((store) => store.auth)
  const geo = useSelector(selectGeo)
  const agent = useSelector(selectAgent)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { sendOTP } = useSendOTP()

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreement) {
      return toast.error(t('Iltimos qoidalarga rozilik berin'))
    }
    if (!email || !password || !confirmPassword) {
      return toast.error(t("Barcha maydonlar to'ldirilishi shart"))
    }
    if (!isEmail(email)) {
      return toast.error(t('Your email is incorrect.'))
    }
    if (password !== confirmPassword) {
      return toast.error(t('Parollar mos kelmadi'))
    }
    if (password.length < 6) {
      return toast.error(t("Parol 6 ta belgidan kam bo'lmasligi kerak"))
    }
    if (phone.slice(0, 4) !== '+998') {
      return toast.error(t("Phone number must start with '+998'."))
    }
    if (phone.length !== 13) {
      return toast.error(t("Telefon raqam noto'g'ri"))
    }

    startTransition(async () => {
      try {
        const res = await register({
          email,
          phone,
          password,
          passwordConfirmation: confirmPassword,
          data: {
            geo,
            agent,
            fingerprint,
          },
        })

        if (res?.error) {
          return toast.error(t(res.error))
        }
        const { phone_verified, success } = res

        if (success) {
          await update()
          localStorage.setItem('app_version', app_version)

          if (!phone_verified && res?.phone) {
            toast.info(t('We are redirecting you to an sms confirmation page!'))
            await sendOTP({
              phone,
              shouldRedirect: true,
              redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(res.phone)}`,
            })
          }
        }
      } catch (error) {
        toast.error(t('An unknown error occurred'))
      }
    })
  }

  return (
    <section className="flex w-full flex-col gap-4 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-8">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-1">
        <h2 className="mb-4 text-xl font-bold text-neutral-100 md:mb-4 md:text-2xl">
          {t("Ro'yxatdan o'tish")}
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
            placeholder={'99-999-99-99'}
            defaultCountry="UZ"
            className="h-10 border-yellow-700 bg-neutral-900 text-white"
            value={phone}
            onChange={setPhone}
          />
        </div>
        <div className="relative flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-xs text-neutral-300 md:text-base"
          >
            {t('Elektron pochta')}:
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            className="auth-input pl-9"
            placeholder="example@xyz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Mail className="filter-neutral-400 absolute bottom-2.5 left-2 size-5" />
        </div>
        <div className="relative flex flex-col gap-1">
          <label
            htmlFor="confirmPassword"
            className="text-xs text-neutral-300 md:text-base"
          >
            {t('Parol')}:
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            className="auth-input pl-9"
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
              <EyeOff className="size-6 text-neutral-200" />
            ) : (
              <Eye className="size-6 text-neutral-200" />
            )}
          </Button>
          <Lock className="filter-neutral-400 absolute bottom-2.5 left-2 size-5" />
        </div>
        <div className="relative flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-xs text-neutral-300 md:text-base"
          >
            {t('Parol tasdiqlash')}:
          </label>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="password"
            id="password"
            placeholder="********"
            className="auth-input pl-9"
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
          <Lock className="filter-neutral-400 absolute bottom-2.5 left-2 size-5" />
        </div>
        <div className="my-3 flex items-center text-xs text-neutral-100 sm:text-sm">
          <input
            type="checkbox"
            className="mr-1.5 inline size-4 cursor-pointer accent-primary"
            id="agreement"
            name="agreement"
            value={agreement}
            onChange={() => setAgreement(!agreement)}
          />
          <label htmlFor="agreement" className="inline select-none">
            {t('Men')}{' '}
            <Link href="/user-agreement" className="underline">
              {t('qoidalar')}
            </Link>{' '}
            {t('bilan tanishib chiqdim va ularga roziman')}
          </label>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            'h-12 w-full rounded border border-yellow-400 bg-neutral-900 font-bold',
            'text-neutral-100 transition-all duration-300 hover:bg-yellow-400 hover:text-neutral-900',
            isPending && 'bg-yellow-400 text-neutral-900'
          )}
        >
          {isPending ? (
            <Image
              src="/icons/loading.svg"
              width={24}
              height={24}
              alt="loading"
              className="filter-black mx-auto size-6 animate-spin"
            />
          ) : (
            t('Akkaunt Ochish')
          )}
        </Button>
      </form>
      <SocialLogin setShouldRedirect={setShouldRedirect} />
    </section>
  )
}

export default memo(SignUpForm)
