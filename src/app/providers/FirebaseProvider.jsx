'use client'

import { useEffect, useState } from 'react'
import {
  initializeFirebase,
  requestNotificationPermission,
  getFirebaseToken,
} from 'app/lib/firebase/firebase'

export default function FirebaseProvider({ children }) {
  const [permission, setPermission] = useState(null)
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        await initializeFirebase()
        const currentPermission = await requestNotificationPermission()
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
