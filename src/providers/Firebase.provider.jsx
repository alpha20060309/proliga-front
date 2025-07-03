'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'lib/firebase/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { setToken } from 'lib/features/auth/auth.slice'

const FirebaseProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { token, tokenLoading } = useSelector((store) => store.auth)

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        if (!user?.id || tokenLoading) return

        await initializeFirebase()

        if (Notification.permission !== 'granted') {
          await Notification.requestPermission()
        }

        if (!token) {
          const newToken = await getFirebaseToken()
          if (newToken) {
            dispatch(setToken(newToken))
          }
        }
      } catch (error) {
        console.error('Error initializing notifications:', error)
      }
    }

    initializeNotifications()
  }, [user?.id, tokenLoading, token, dispatch])

  return <>{children}</>
}

export default memo(FirebaseProvider)
