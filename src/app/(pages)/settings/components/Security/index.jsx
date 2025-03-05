'use client'

import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { SettingsContainer } from '../Container'
import ChangePasswordForm from './ChangePasswordForm'
import ChangePhoneForm from './ChangePhoneForm'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <SettingsContainer>
      <h2 className="text-xl font-bold tracking-tight text-neutral-100">
        {t('Security settings')}
      </h2>
      <section className="flex flex-col gap-4 lg:flex-row">
        <FormContainer>
          <h3 className={cn('mb-2 text-lg font-bold')}>
            {t('Parol Yangilash')}
          </h3>
          <ChangePasswordForm />
        </FormContainer>
        <FormContainer>
          <h3 className={cn('mb-2 text-lg font-bold')}>
            {t('Update Phone Number')}
          </h3>
          <ChangePhoneForm />
        </FormContainer>
      </section>
    </SettingsContainer>
  )
}

const FormContainer = ({ children }) => {
  return (
    <div className="w-full rounded-lg border border-neutral-500 bg-neutral-900/50 p-2 py-6 lg:px-4">
      {children}
    </div>
  )
}
