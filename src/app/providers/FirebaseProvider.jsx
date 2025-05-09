'use client'

import { useEffect, memo, useState } from 'react'
import { initializeFirebase, getFirebaseToken } from 'app/lib/firebase/firebase'
import { useSelector } from 'react-redux'
import { useUpdateUserNotificationInfo } from 'app/hooks/user/useUpdateUserNotificationInfo/useUpdateUserNotificationInfo'

const FirebaseProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const { updateNotificationToken } = useUpdateUserNotificationInfo()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        const isAuthenticated = localStorage.getItem('isAuthenticated')

        if (!isAuthenticated || !user?.id || isInitialized) {
          return
        }

        await initializeFirebase()
        const currentPermission = await Notification.requestPermission()

        if (currentPermission === 'granted') {
          // if (user?.ntf_token) {
          //   setIsInitialized(true)
          //   return
          // }

          const fcmToken = await getFirebaseToken()
          console.log('fcmToken', fcmToken)
          // await updateNotificationToken({
          //   notification_token: fcmToken,
          //   userTable: user,
          // })
          setIsInitialized(true)
        }
      } catch (error) {
        console.error('Error initializing notifications:', error)
      }
    }

    initializeNotifications()
  }, [user])

  return <>{children}</>
}

export default memo(FirebaseProvider)
