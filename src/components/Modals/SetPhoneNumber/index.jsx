'use client'

import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PhoneInput } from 'components/PhoneInput'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setPhoneModal } from 'app/lib/features/auth/auth.slice'
import { getSession } from 'app/lib/supabaseClient'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

function SetPhoneNumber() {
  const dispatch = useDispatch()
  const { phoneModal } = useSelector((store) => store.auth)
  const { t } = useTranslation()
  const [phone, setPhone] = useState('')
  const [session, setSession] = useState(null)
  const isLoading = false
  const userTable = useSelector(selectUserTable)

  console.log(session)
  const setModalOpen = () => {
    userTable?.phone && dispatch(setPhoneModal(false))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    const fetch = async () => {
      const session = await getSession()
      if (session?.user?.id) {
        setSession(session)
      }
    }
    fetch()
  }, [])

  return (
    <Dialog open={phoneModal} onOpenChange={setModalOpen}>
      <DialogContent className="w-[98%] max-w-md rounded-xl bg-neutral-950 px-4 py-6 text-neutral-100 sm:p-6">
        <DialogTitle>{t('Enter your phone number.')}</DialogTitle>
        <DialogDescription>
          {t(
            'To complete your registration, please link your mobile phone to your account. This step is mandatory.'
          )}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative space-y-1">
            <Label htmlFor="set-phone">{t('Telefon raqam')}:</Label>
            <PhoneInput
              id="set-phone"
              name="phone"
              placeholder={t('Telefon raqam')}
              defaultCountry="UZ"
              className="h-10 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <Button
            type="submit"
            className="h-10 w-full rounded border border-primary bg-neutral-900 text-neutral-50 transition-all hover:bg-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting...
              </>
            ) : (
              'Tasdiqlash'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SetPhoneNumber)
