/* eslint-disable no-unused-vars */
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
import { setUpdatePhoneModal } from 'app/lib/features/auth/auth.slice'
import { getSession } from 'app/lib/supabaseClient'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { toast } from 'react-toastify'

function UpdatePhoneNumber({ isModalOpen, setModalOpen }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [prevPhone, setPrevPhone] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userTable = useSelector(selectUserTable)

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="w-[98%] max-w-md rounded-xl bg-neutral-950 p-5 text-neutral-100 sm:p-6">
        <DialogTitle>{t('Update Phone Number')}</DialogTitle>
        <DialogDescription>
          {t(
            'To update your phone number, please enter your previous and new phone numbers.'
          )}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative space-y-1">
            <Label htmlFor="prev-phone">{t('Previous Phone Number')}:</Label>
            <PhoneInput
              id="prev-phone"
              name="prevPhone"
              placeholder={t('Previous Phone Number')}
              defaultCountry="UZ"
              className="h-10 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500"
              value={prevPhone}
              onChange={setPrevPhone}
              disabled // Disable editing for the previous phone number
            />
          </div>
          <div className="relative space-y-1">
            <Label htmlFor="new-phone">{t('New Phone Number')}:</Label>
            <PhoneInput
              id="new-phone"
              name="newPhone"
              placeholder={t('New Phone Number')}
              defaultCountry="UZ"
              className="h-10 bg-neutral-950 text-neutral-200 placeholder:text-neutral-500"
              value={newPhone}
              onChange={setNewPhone}
            />
          </div>
          <Button
            type="submit"
            className="h-10 w-full rounded border border-primary bg-neutral-900 text-neutral-50 transition-all hover:bg-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              t('Update')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(UpdatePhoneNumber)
