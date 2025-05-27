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
      <h2 className="text-foreground text-xl font-bold tracking-tight">
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
    <div className="border-border bg-background w-full rounded-lg border p-2 py-6 lg:px-4">
      {children}
    </div>
  )
}
