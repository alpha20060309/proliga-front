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
        const token = await getFirebaseToken()
        console.log('token', token)
      }
    }

    initializeNotifications()
  }, [])

  return <>{children}</>
}

export default memo(FirebaseProvider)
