'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PhoneInput } from 'components/PhoneInput'
import { Label } from '@/components/ui/label'
import { Loader2, Mail } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import {
  selectAgent,
  selectGeo,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { toast } from 'react-toastify'
import { useGoogleRegister } from 'app/hooks/auth/useGoogleRegister/useGoogleRegister'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { CONFIG_KEY } from 'app/utils/config.util'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'

function SetPhoneNumber() {
  const dispatch = useDispatch()
  const { phoneModal } = useSelector((store) => store.auth)
  const { t } = useTranslation()
  const { data: session } = useSession()
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState(session?.user?.email || '')
  const isLoading = false
  const userTable = useSelector(selectUserTable)
  const { register } = useGoogleRegister()
  const geo = useSelector(selectGeo)
  const agent = useSelector(selectAgent)
  const { fingerprint } = useSelector((store) => store.auth)
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value || ''

  const setModalOpen = () => {
    userTable?.phone && dispatch(setPhoneModal(false))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!phone) {
      return toast.error(t('Telefon raqam kiritilmagan'))
    }
    if (!session?.user?.id) {
      return toast.warning(t('An unknown error occurred'))
    }

    await register({
      phone,
      auth: session?.user,
      geo,
      fingerprint,
      agent,
      app_version,
      closeModal: () => dispatch(setPhoneModal(true)),
    })
  }
  return (
    <Dialog open={phoneModal} onOpenChange={setModalOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-[98%] max-w-md rounded-xl bg-neutral-950 p-5 text-neutral-100 sm:p-6"
      >
        <DialogTitle>{t('Enter your credentials.')}</DialogTitle>
        <DialogDescription>
          {t(
            'To complete your registration, please link your credentials with your account. This step is mandatory.'
          )}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="space-y-2">
            <div className="relative space-y-1">
              <Label htmlFor="set-phone">{t('Telefon raqam')}:</Label>
              <PhoneInput
                id="set-phone"
                name="phone"
                placeholder={t('Telefon raqam')}
                defaultCountry="UZ"
                className="h-10 border-neutral-500 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="email">{t('Elektron pochta')}:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="h-10 border-neutral-500 bg-neutral-950 pl-10 text-neutral-200 placeholder:text-neutral-500"
                placeholder="example@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="filter-neutral-400 absolute bottom-2.5 left-2 size-5" />
            </div>
          </section>
          <Button
            type="submit"
            className="h-10 w-full rounded border border-primary bg-neutral-900 text-neutral-50 transition-all hover:bg-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t('Tasdiqlash')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SetPhoneNumber)
