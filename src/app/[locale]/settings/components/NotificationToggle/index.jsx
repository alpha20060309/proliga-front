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
import axios from 'axios'
import { selectUser } from 'lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'
import { deleteToken } from 'firebase/messaging'

const NotificationToggle = () => {
  const { t } = useTranslation()
  const [permission, setPermission] = useState('default')
  const [isEnabled, setIsEnabled] = useState(false)
  const user = useSelector(selectUser)
  const { token, fingerprint } = useSelector(store => store.auth)

  const handleTurnOff = async () => {
    await axios.post('/api/push-notification/unsubscribe', {
      token,
      topic: 'global',
      user_id: user.id,
      fingerprint,
    })
    deleteToken(token)
    setIsEnabled(false)
  }

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
      setIsEnabled(Notification.permission === 'granted')
    }
  }, [])

  return (
    <Card className="flex w-full flex-col gap-4 px-4 sm:max-w-64">
      <CardHeader className={'flex items-center justify-between p-0'}>
        <CardTitle>{t('Xabarnomalar')}</CardTitle>
        <Switch
          checked={isEnabled}
          disabled={!('Notification' in window) || permission !== 'granted'}
          className="data-[state=checked]:bg-success cursor-pointer data-[state=unchecked]:bg-muted h-5 w-10"
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
