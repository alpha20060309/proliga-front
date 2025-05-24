'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useSelector } from 'react-redux'
import {
  selectAgent,
  selectGeo,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { PhoneInput } from 'components/PhoneInput'
import { useAuthChangePhone } from 'app/hooks/auth/useAuthChangePhone/useAuthChangePhone'
import ConfirmOTP from 'components/Modals/ConfirmOTP'
import { toast } from 'sonner'

export default function ChangePhoneForm() {
  const [isModalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation()
  const { isLoading, updatePhone } = useAuthChangePhone()
  const userTable = useSelector(selectUserTable)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)

  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (phone.slice(0, 4) !== '+998') {
      return toast.error(t("Phone number must start with '+998'."))
    }
    if (phone.length !== 13) {
      return toast.error(t("Telefon raqam noto'g'ri"))
    }

    const status = await updatePhone({
      phone_new: phone,
      password,
      agent,
      geo,
      id: userTable?.id,
      phone: userTable?.phone,
      cb: () => setModalOpen(true),
    })

    if (status) {
      setTimeout(() => {
        setPassword('')
        setPhone('')
      }, 1000)
    }
  }

  return (
    <>
      <ConfirmOTP
        phone={phone}
        setModalOpen={setModalOpen}
        isModalOpen={isModalOpen}
        is_update={true}
        refreshUser={false}
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-1 sm:max-w-96"
      >
        <section>
          <div className="relative">
            <Label htmlFor="phone">{t('New Phone Number')}:</Label>
            <PhoneInput
              id="phone"
              name="phone"
              defaultCountry="UZ"
              className="text-secondary-foreground h-10 rounded-sm border-neutral-400 bg-neutral-900 placeholder:text-neutral-500"
              value={''}
              placeholder={'99-999-99-99'}
              onChange={setPhone}
            />
          </div>
          <div className="relative sm:max-w-96">
            <Label htmlFor="oldPassword">{t('Parol')}</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              className="h-10 border-neutral-400 bg-neutral-900 pr-10"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 bottom-0 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="text-secondary-foreground h-5 w-5" />
              ) : (
                <Eye className="text-secondary-foreground h-5 w-5" />
              )}
            </Button>
          </div>
        </section>
        <Button
          className="border-primary/75 text-secondary-foreground hover:border-primary xs:max-w-40 h-10 w-full rounded-sm border bg-neutral-900 text-sm font-semibold transition-all"
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
