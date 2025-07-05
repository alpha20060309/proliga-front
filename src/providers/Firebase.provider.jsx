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
  const agent = useSelector(selectAgent)
  const { createToken } = useCreateToken()
  const { updateToken } = useUpdateToken()
  const { userToken, tokenLoaded } = useSelector((store) => store.userToken)

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserToken({ user_id: user.id }))
    }
  }, [user?.id, dispatch])

  useEffect(() => {
    const initializeAndSync = async () => {
      if (!user?.id || !tokenLoaded) {
        return
      }

      try {
        const deviceToken = await getNotificationPermissionAndToken()

        if (deviceToken) {
          if (!userToken?.id) {
            await createToken({ user_id: user.id, token: deviceToken, device: `${agent?.platform} ${agent?.browser}` })
            await axios.post('/api/push-notifications/subscribe', {
              token: deviceToken,
              topic: 'global',
              user_id: user.id,
            })
          } else if (userToken?.token !== deviceToken) {
            await updateToken({ user_id: user.id, token: deviceToken, device: `${agent?.platform} ${agent?.browser}` })
          }
        }
      } catch (error) {
        console.error('Error during notification sync:', error)
      }
    }

    initializeAndSync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, tokenLoaded, userToken?.id, createToken, updateToken])

  return <>{children}</>
}

export default memo(FirebaseProvider)
