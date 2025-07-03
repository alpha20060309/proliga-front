'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'lib/firebase/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'

const FirebaseProvider = ({ children }) => {
  const user = useSelector(selectUser)
  const { token, tokenLoading } = useSelector((store) => store.auth)

  useEffect(() => {
    const initializeNotifications = async () => {
      console.log('initializeFirebase1')

      if (!user?.id || tokenLoading) return
      await initializeFirebase()
      console.log('initializeFirebase')
      if (Notification.permission !== 'granted') {
        Notification.requestPermission()
      }

      if (!token) {
        console.log('no token')
        const newToken = await getFirebaseToken()
        console.log('newToken', newToken)
      }

    }

    initializeNotifications()
  }, [user?.id, tokenLoading, token])

  return <>{children}</>
}

export default memo(FirebaseProvider)
