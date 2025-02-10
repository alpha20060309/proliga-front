'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import NotificationModal from './Modal'
import NotificationArticle from './NotificationArticle'
import Image from 'next/image'
import { selectNotifications } from 'app/lib/features/systemNotification/systemNotification.selector'
import { supabase } from 'app/lib/supabaseClient'
import {
  addNotification,
  updateNotification,
  deleteNotification,
} from 'app/lib/features/systemNotification/systemNotification.slice'
import { SUPABASE_EVENT_TYPE } from 'app/lib/supabaseClient'

const Notification = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isNotificationsOpen, setNotificationsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const systemNotifications = useSelector(selectNotifications)

  const handleOpen = () => {
    setNotificationsOpen(!isNotificationsOpen)
  }

  const handleClick = (notification) => {
    const readNotificationIds = JSON.parse(
      localStorage.getItem('readNotificationIds') || '[]'
    )
    setSelectedNotification(notification)
    setIsModalOpen(true)

    if (readNotificationIds?.includes(notification?.id)) return
    localStorage.setItem(
      'readNotificationIds',
      JSON.stringify([...readNotificationIds, notification.id])
    )
    setUnreadCount((prev) => prev - 1)
  }

  useEffect(() => {
    const readNotificationIds = JSON.parse(
      localStorage.getItem('readNotificationIds') || '[]'
    )

    if (systemNotifications?.length > 0) {
      const unreadNotifications = systemNotifications.filter(
        (notification) => !readNotificationIds.includes(notification.id)
      )
      setUnreadCount(unreadNotifications.length)
    }
  }, [systemNotifications])

  useEffect(() => {
    const handleNotification = (payload) => {
      const { new: New, old: Old, eventType } = payload

      switch (eventType) {
        case SUPABASE_EVENT_TYPE.INSERT:
          dispatch(addNotification(New))
          break
        case SUPABASE_EVENT_TYPE.UPDATE:
          dispatch(updateNotification(New))
          break
        case SUPABASE_EVENT_TYPE.DELETE:
          dispatch(deleteNotification(Old))
          break
        default:
          null
      }
    }

    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_notification',
        },
        (payload) => handleNotification(payload)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [dispatch])

  return (
    <Popover open={isNotificationsOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <button aria-label={t('Open notifications')} className="relative">
          <Image
            src={'/icons/bell.svg'}
            alt="bell"
            draggable={false}
            width={24}
            height={24}
            className={cn(
              `hover:filter-neutral-50 size-6 select-none`,
              isNotificationsOpen ? 'filter-primary' : 'filter-neutral-200'
            )}
          />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className={cn(
                'absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full p-1 text-[10px]',
                isNotificationsOpen ? 'bg-neutral-800' : 'bg-red-700'
              )}
            >
              {unreadCount}
            </Badge>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="ml-2 mt-5 w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <h3 className="text-sm font-semibold">{t('Xabarnomalar')}</h3>
        </div>
        <ScrollArea className="dark h-80">
          {systemNotifications?.length === 0 ? (
            <p className="text-muted-foreground p-4 text-center text-sm">
              {t('Hozicha habarlar yoq')}
            </p>
          ) : (
            systemNotifications?.map((notification) => (
              <NotificationArticle
                key={notification?.id + Math.random()}
                notification={notification}
                handleNotificationClick={handleClick}
              />
            ))
          )}
        </ScrollArea>
      </PopoverContent>
      <NotificationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        notification={selectedNotification}
      />
    </Popover>
  )
}

export default Notification
