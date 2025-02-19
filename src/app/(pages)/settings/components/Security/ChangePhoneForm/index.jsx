'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Eye, EyeOff, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { PhoneInput } from 'components/PhoneInput'

export default function ChangePhoneForm() {
  const { t } = useTranslation()
  const userTable = useSelector(selectUserTable)

  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const isLoading = false

  return (
    <section className="flex flex-col gap-2 px-1 sm:max-w-96">
      <div className="relative">
        <Label htmlFor="prev-phone">{t('Telefon raqam')}:</Label>
        <PhoneInput
          id="prev-phone"
          name="prevPhone"
          defaultCountry="UZ"
          className="h-10 border-neutral-400 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500"
          value={userTable?.phone}
          placeholder={'99-999-99-99'}
          // onChange={setPrevPhone}
        />
      </div>
      <div className="relative sm:max-w-96">
        <Label htmlFor="confirmPassword">{t('Parol')}</Label>
        <Input
          id="password"
          name="password"
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
      <Button
        className="h-10 w-full rounded border border-black border-primary/75 bg-neutral-900 text-sm font-semibold text-neutral-200 transition-all hover:border-primary xs:max-w-40"
        type="submit"
      >
        {isLoading ? (
          <Loader className="filter-black mx-auto size-5 animate-spin" />
        ) : (
          t('Saqlash')
        )}
      </Button>
    </section>
  )
}
