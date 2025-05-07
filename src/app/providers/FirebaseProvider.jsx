'use client'

import { useEffect, useState, memo } from 'react'
import {
  initializeFirebase,
  getFirebaseToken,
} from 'app/lib/firebase/firebase'

const FirebaseProvider = ({ children }) => {
  const [permission, setPermission] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await initializeFirebase()
        const currentPermission = await Notification.requestPermission();
        console.log(currentPermission)
        if (currentPermission !== "granted") {
          console.log("permission denied", currentPermission)
          return;
        }
        setPermission(currentPermission)

        if (currentPermission === 'granted') {
          const fcmToken = await getFirebaseToken()
          console.log('client-Token', fcmToken)
          setToken(fcmToken)
        }
      } catch (error) {
        console.log(error)
        console.error('Error initializing notifications:', error)
        setError('Failed to initialize notifications. Please try again.')
      }
    }

    initializeNotifications()
  }, [])
  
  console.log(permission, token, error)
  console.log('hello')
  return <>{children}</>
}

export default memo(FirebaseProvider)
