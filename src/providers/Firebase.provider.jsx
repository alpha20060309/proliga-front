'use client'

import { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNotificationPermissionAndToken } from 'hooks/system/useFCMToken'
import { selectUser } from 'lib/features/auth/auth.selector'
import { fetchFirebaseToken } from 'lib/features/auth/auth.thunk'
import { useCreateToken } from 'hooks/system/useCreateToken'
import { useUpdateToken } from 'hooks/system/useUpdateToken'
import axios from 'axios'

const FirebaseProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { token, fingerprint, tokenLoaded } = useSelector((store) => store.auth)
  const { createToken } = useCreateToken()
  const { updateToken } = useUpdateToken()

  useEffect(() => {
    if (user?.id && fingerprint?.length > 0) {
      dispatch(fetchFirebaseToken({ user_id: user.id, fingerprint }))
    }
  }, [user?.id, dispatch, fingerprint])

  useEffect(() => {
    const initializeAndSync = async () => {
      if (!user?.id || !fingerprint || !tokenLoaded) {
        return
      }

      try {
        const deviceToken = await getNotificationPermissionAndToken()

        if (deviceToken) {
          if (!token) {
            await createToken({ user_id: user.id, fingerprint, token: deviceToken })
            await axios.post('/api/push-notifications/subscribe', {
              token: deviceToken,
              topic: 'global',
              user_id: user.id,
              fingerprint,
            })
          } else if (token !== deviceToken) {
            console.log('update token', deviceToken)
            await updateToken({ user_id: user.id, fingerprint, token: deviceToken })
          }
        }
      } catch (error) {
        console.error('Error during notification sync:', error)
      }
    }

    initializeAndSync()
  }, [user?.id, fingerprint, tokenLoaded, token, createToken, updateToken])

  return <>{children}</>
}

export default memo(FirebaseProvider)
