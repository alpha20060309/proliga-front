'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'app/lib/firebase/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from 'app/lib/features/auth/auth.selector'

const FirebaseProvider = ({ children }) => {
  const user = useSelector(selectUser)

  useEffect(() => {
    const initializeNotifications = async () => {
      await initializeFirebase()
      if (Notification.permission === 'granted') {
        const savedToken = localStorage.getItem('fcm_token')
        if (savedToken) return
        const token = await getFirebaseToken()
        localStorage.setItem('fcm_token', token)
      }
    }

    initializeNotifications()
  }, [])

  return <>{children}</>
}

export default memo(FirebaseProvider)
