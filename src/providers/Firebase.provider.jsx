'use client'

import { useEffect, memo, useState } from 'react'
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
  const { userToken } = useSelector((store) => store.userToken)
  const [deviceToken, setDeviceToken] = useState(null)

  useEffect(() => {
    const getDeviceToken = async () => {
      if (!user?.id) return;
      const token = await getNotificationPermissionAndToken()
      dispatch(fetchUserToken({ user_id: user.id, token }));
      setDeviceToken(token)
    }
    getDeviceToken()
  }, [dispatch, user?.id])

  useEffect(() => {
    const syncNotificationToken = async () => {
      if (!user?.id || !deviceToken) return;

      try {
        const device = `${agent?.platform ?? ''} ${agent?.browser ?? ''}`;
        if (!userToken?.id) {
          // No token in backend, create and subscribe
          await createToken({ user_id: user.id, token: deviceToken, device });
          await axios.post('/api/push-notifications/subscribe', {
            token: deviceToken,
            topic: 'global',
            user_id: user.id,
          });
        } else if (userToken?.token !== deviceToken) {
          // Token changed, update backend
          await updateToken({ user_id: user.id, token: deviceToken, device });
        }
      } catch (err) {
        console.error('Error during notification sync:', err);
      }
    };

    syncNotificationToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, userToken?.id, createToken, updateToken]);

  return <>{children}</>
}

export default memo(FirebaseProvider)
