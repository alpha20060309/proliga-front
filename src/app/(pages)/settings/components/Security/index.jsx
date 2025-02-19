'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsContainer } from '../Container'
import ChangePasswordForm from './ChangePasswordForm'
import ChangePhoneForm from './ChangePhoneForm'
import SettingsAlert from '../Alert'
import { useSendOTP } from 'app/hooks/auth/useSendOTP/useSendOTP'
import { useSelector } from 'react-redux'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { Lock, Phone } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function SettingsPage() {
  const { t } = useTranslation()
  const { sendOTP } = useSendOTP()
  const userTable = useSelector(selectUserTable)

  const [isModalOpen, setModalOpen] = useState(false)

  const handleSendSms = async () => {
    setModalOpen(true)
    await sendOTP({ phone: userTable?.phone })
  }

  return (
    <SettingsContainer>
      <h2 className="text-xl font-bold tracking-tight text-neutral-100">
        {t('Security settings')}
      </h2>
      <SettingsAlert
        message={t(
          'To change your password, you must confirm your identity using a one-time password sent via SMS.'
        )}
        actionText={t('Send')}
        onAction={handleSendSms}
      />
      <Accordion type="single" collapsible>
        <AccordionItem value="pass">
          <AccordionTrigger className="mb-0.5 rounded-lg p-2 hover:bg-neutral-950 hover:no-underline">
            <div className="flex items-center">
              <Lock className="mr-2 h-5 w-5 text-neutral-50" />
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-50">
                  {t('Parol Yangilash')}
                </h3>
                <p className="text-sm text-neutral-400">
                  {t('Update your password to keep your account secure')}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ChangePasswordForm
              isModalOpen={isModalOpen}
              setModalOpen={setModalOpen}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="phone">
          <AccordionTrigger className="my-0.5 rounded-lg p-2 hover:bg-neutral-950 hover:no-underline">
            <div className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-neutral-50" />
              <div className="text-left">
                <h3 className="text-base font-semibold text-gray-50">
                  {t('Update Phone Number')}
                </h3>
                <p className="text-sm text-neutral-400">
                  {t('Keep your contact information up to date')}
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ChangePhoneForm />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </SettingsContainer>
  )
}
