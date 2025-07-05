'use client'

import { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNotificationPermissionAndToken } from 'hooks/system/useFCMToken'
import { selectUser } from 'lib/features/auth/auth.selector'
import { fetchUserToken } from 'lib/features/userToken/userToken.thunk'
import { useCreateToken } from 'hooks/system/useCreateToken'
import { useUpdateToken } from 'hooks/system/useUpdateToken'
import { selectAgent } from 'lib/features/auth/auth.selector'
import axios from 'axios'

const FirebaseProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { fingerprint } = useSelector((store) => store.auth)
  const agent = useSelector(selectAgent)
  const { createToken } = useCreateToken()
  const { updateToken } = useUpdateToken()
  const { userToken, tokenLoaded } = useSelector((store) => store.userToken)

  useEffect(() => {
    if (user?.id && fingerprint?.length > 0) {
      dispatch(fetchUserToken({ user_id: user.id, fingerprint }))
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
          if (!userToken?.id) {
            await createToken({ user_id: user.id, fingerprint, token: deviceToken })
            await axios.post('/api/push-notifications/subscribe', {
              token: deviceToken,
              topic: 'global',
              user_id: user.id,
              fingerprint,
            })
          } else if (userToken?.token !== deviceToken) {
            console.log('update token', deviceToken)
            await updateToken({ user_id: user.id, fingerprint, token: deviceToken, device: `${agent?.os} ${agent?.browser}` })
          }
        }
      } catch (error) {
        console.error('Error during notification sync:', error)
      }
    }

    initializeAndSync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, fingerprint, tokenLoaded, userToken?.id, createToken, updateToken])

  return <>{children}</>
}

export default memo(FirebaseProvider)
