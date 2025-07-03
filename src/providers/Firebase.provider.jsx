'use client'

import { useEffect, memo } from 'react'
import { initializeFirebase, getFirebaseToken } from 'lib/firebase/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { fetchFirebaseToken } from 'lib/features/auth/auth.thunk'
import { useCreateToken } from 'hooks/system/useCreateToken'

const FirebaseProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { token, fingerprint, tokenLoaded } = useSelector((store) => store.auth)
  const { createToken } = useCreateToken()

  useEffect(() => {
    if (user?.id && fingerprint) {
      dispatch(fetchFirebaseToken({ user_id: user.id, fingerprint }))
    }
  }, [user?.id, dispatch, fingerprint])

  useEffect(() => {
    const initializeNotifications = async () => {
      try {
        if (!user?.id) return

        await initializeFirebase()

        if (Notification.permission !== 'granted') {
          await Notification.requestPermission()
        }

        if (!token?.id && tokenLoaded) {
          const newToken = await getFirebaseToken()
          await createToken({ user_id: user.id, fingerprint, token: newToken })
        }

      } catch (error) {
        console.error('Error initializing notifications:', error)
      }
    }

    initializeNotifications()
  }, [user?.id, token, dispatch, fingerprint, createToken, tokenLoaded])

  return <>{children}</>
}

export default memo(FirebaseProvider)


// 1. Get user token
// 2. Initialize firebase
// 3. ?Request permission
// 4. Create token
// 5. Save token to database
// 6. Save token to redux
