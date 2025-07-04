'use client'
import { useTranslation } from 'react-i18next'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import { Switch } from 'components/ui/switch'
import { useState, useEffect } from 'react'

const NotificationToggle = () => {
  const { t } = useTranslation()
  const [permission, setPermission] = useState('default')
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
      setIsEnabled(Notification.permission === 'granted')
    }
  }, [])
  console.log(permission)

  return (
    <Card className="flex w-full flex-col gap-4 px-4 sm:max-w-64">
      <CardHeader className={'flex items-center justify-between p-0'}>
        <CardTitle>{t('Xabarnomalar')}</CardTitle>
        <Switch
          checked={isEnabled}
          disabled={!('Notification' in window) || permission === 'denied'}
          className="data-[state=checked]:bg-success data-[state=unchecked]:bg-muted h-5 w-10"
          thumbClassName="size-5 data-[state=checked]:translate-x-5"
        />
      </CardHeader>
      <CardDescription>
        {t(
          'Получайте уведомление о важных новостях, сообщениях, и действиях в режиме реального времени'
        )}
      </CardDescription>
    </Card>
  )
}

export default NotificationToggle
