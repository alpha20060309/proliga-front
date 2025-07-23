'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSystemConfig } from '../lib/features/systemConfig/systemConfig.thunk'
import { useGenerateFingerprint } from 'hooks/system/useGenerateFingerprint'
import { useGetUserAgent } from 'hooks/system/useGetUserAgent'
import { fetchGeo } from 'lib/features/auth/auth.thunk'
import { selectUser } from 'lib/features/auth/auth.selector'
import {
  fetchBroadcastNotifications,
  fetchPersonalNotifications,
} from 'lib/features/systemNotification/systemNotification.thunk'
import dynamic from 'next/dynamic'
const registerSW = dynamic(() => import('lib/registerSw'), { ssr: false })

const InitialStateProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { fingerprint } = useSelector((store) => store.auth)
  const { generateFingerprint } = useGenerateFingerprint()
  const { getUserAgent } = useGetUserAgent()

  useEffect(() => {
    Promise.all([
      dispatch(fetchGeo()),
      dispatch(fetchSystemConfig()),
      getUserAgent(),
      generateFingerprint(),
      dispatch(fetchBroadcastNotifications())
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user?.id && user?.phone && user?.phone_verified) {
      dispatch(fetchPersonalNotifications({ user_id: user?.id }))
    }
  }, [dispatch, user?.id, user?.phone, user?.phone_verified, fingerprint])

  useEffect(() => {
    registerSW()
  }, [])

  return children
}

export default memo(InitialStateProvider)
