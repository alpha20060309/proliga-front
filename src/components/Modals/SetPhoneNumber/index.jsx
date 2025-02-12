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
import { Loader2 } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

function SetPhoneNumber({ isModalOpen, setModalOpen }) {
  const { t } = useTranslation()
  const [phone, setPhone] = useState('')
  const isLoading = false

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="w-[98%] max-w-md rounded-xl">
        <DialogTitle>{t('Enter your phone number.')}</DialogTitle>
        <DialogDescription>
          {t(
            'To complete your registration, please link your mobile phone to your account. This step is mandatory.'
          )}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">{t('Telefon raqam')}:</Label>
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
