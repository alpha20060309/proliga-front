'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'app/lib/firebase/firebase'
import { useSelector } from 'react-redux'
import { useUpdateUserNotifications } from 'app/hooks/user/useUpdateUserNotifications/useUpdateUserNotifications'
import { boolean } from 'zod'

const FirebaseProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const { updateNotificationToken } = useUpdateUserNotifications()

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        await initializeFirebase()
        const currentPermission = await Notification.requestPermission()

        if (
          currentPermission === 'granted' &&
          boolean(isAuthenticated) &&
          user?.id
        ) {
          // if (user?.notification_token) {
          //   return
          // }

          const fcmToken = await getFirebaseToken()
          await updateNotificationToken({
            notification_token: fcmToken,
            userTable: user,
          })
        }
      } catch (error) {
        console.error('Error initializing notifications:', error)
      }
    }

    initializeNotifications()
  }, [user, updateNotificationToken])

  return <>{children}</>
}

export default memo(FirebaseProvider)
