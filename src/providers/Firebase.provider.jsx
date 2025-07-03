'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'lib/firebase/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'

const FirebaseProvider = ({ children }) => {
  const user = useSelector(selectUser)

  useEffect(() => {
    const initializeNotifications = async () => {
      if (!user?.id) return

      await initializeFirebase()
      if (Notification.permission !== 'granted') {
        Notification.requestPermission()
      }

      // if (Notification.permission === 'granted') {
      //   const token = await getFirebaseToken()
      //   console.log('token', token)
      // }

    }

    initializeNotifications()
  }, [user?.id])

  return <>{children}</>
}

export default memo(FirebaseProvider)
