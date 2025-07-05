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
import { selectAgent, selectUser } from 'lib/features/auth/auth.selector'
import { useDispatch, useSelector } from 'react-redux'
import { deleteToken } from 'firebase/messaging'
import { getNotificationPermissionAndToken } from 'hooks/system/useFCMToken'
import { useUpdateToken } from 'hooks/system/useUpdateToken'
import { messaging } from 'lib/firebase/firebase'
import { toast } from 'sonner'
import { setUserToken } from 'lib/features/userToken/userToken.slice'

const NotificationToggle = () => {
  const { t } = useTranslation()
  const [permission, setPermission] = useState('default')
  const [isEnabled, setIsEnabled] = useState(false)
  const user = useSelector(selectUser)
  const { fingerprint } = useSelector(store => store.auth)
  const agent = useSelector(selectAgent)
  const { token } = useSelector(store => store.userToken)
  const { updateToken } = useUpdateToken()
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!('Notification' in window)) {
      setDisabled(true)
    } else if (permission === 'denied') {
      setDisabled(true)
    }
  }, [permission])

  const handleTurnOn = async () => {
    const deviceToken = await getNotificationPermissionAndToken()

    if (deviceToken) {
      if (token !== deviceToken) {
        try {
          await updateToken({ user_id: user.id, fingerprint, token: deviceToken, device: `${agent?.os} ${agent?.browser}` })
          await axios.post('/api/push-notifications/subscribe', {
            token: deviceToken,
            topic: 'global',
            user_id: user.id,
            fingerprint,
          })
          setIsEnabled(true)
          setPermission('granted')
        } catch (error) {
          toast.error(error.message)
        }
      }
    } else {
      setIsEnabled(false)
    }
  }

  const handleTurnOff = async () => {
    try {
      await axios.post('/api/push-notifications/unsubscribe', {
        token,
        topic: 'global',
        user_id: user.id,
        fingerprint,
      })
      dispatch(setUserToken(null))
      const fcmMessaging = await messaging()
      if (fcmMessaging) {
        await deleteToken(fcmMessaging)
      }
      setIsEnabled(false)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleToggle = async (checked) => {
    if (checked) {
      await handleTurnOn()
    } else {
      await handleTurnOff()
    }
  }

  useEffect(() => {
    if ('Notification' in window) {
      const permission = Notification.permission
      setPermission(permission)
      if (permission === 'granted' && token) {
        setIsEnabled(true)
      } else {
        setIsEnabled(false)
      }
    }
  }, [token])

  return (
    <Card className="flex w-full flex-col gap-4 px-4 sm:max-w-64">
      <CardHeader className={'flex items-center justify-between p-0'}>
        <CardTitle>{t('Xabarnomalar')}</CardTitle>
        <Switch
          checked={isEnabled}
          onCheckedChange={handleToggle}
          disabled={disabled}
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
