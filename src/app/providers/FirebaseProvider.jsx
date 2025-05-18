'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'app/lib/firebase/firebase'
import { useSelector } from 'react-redux'
import { useUpdateUserNotificationInfo } from 'app/hooks/user/useUpdateUserNotificationInfo/useUpdateUserNotificationInfo'

const FirebaseProvider = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  const { updateNotificationToken } = useUpdateUserNotificationInfo()

  // useEffect(() => {
  //   const initializeNotifications = async () => {
  //     const isAuthenticated = localStorage.getItem('isAuthenticated')

  //     if (!isAuthenticated || !user?.id) {
  //       return
  //     }
  //     await initializeFirebase()
  //     const token = await getFirebaseToken()

  //     const savedToken = localStorage.getItem('fcm_token')

  //     if (savedToken !== token) {
  //       localStorage.setItem('fcm_token', token)
  //     }

  //     if (token && token !== savedToken) {
  //       updateNotificationToken({
  //         notification_token: token,
  //         userTable: user,
  //       })
  //     }

  //     console.log('token', token)
  //   }

  //   initializeNotifications()
  // }, [user?.id, updateNotificationToken])

  return <>{children}</>
}

export default memo(FirebaseProvider)
