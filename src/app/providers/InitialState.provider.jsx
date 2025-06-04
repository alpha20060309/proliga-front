'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSystemConfig } from '../lib/features/systemConfig/systemConfig.thunk'
import { useGenerateFingerprint } from 'app/hooks/system/useGenerateFingerprint/useGenerateFingerprint'
import { useGetUserAgent } from 'app/hooks/system/useGetUserAgent/useGetUserAgent'
import { fetchGeo } from 'app/lib/features/auth/auth.thunk'
import { fetchPrizes } from 'app/lib/features/prize/prize.thunk'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import {
  fetchBroadcastNotifications,
  fetchPersonalNotifications,
} from 'app/lib/features/systemNotification/systemNotification.thunk'
import dynamic from 'next/dynamic'
const registerSW = dynamic(() => import('app/lib/registerSw'), { ssr: false })
// import { useGenerateLanguage } from 'app/hooks/system/useGenerateLanguage/useGenerateLanguage'

const InitialStateProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserTable)
  const { generateFingerprint } = useGenerateFingerprint()
  const { getUserAgent } = useGetUserAgent()

  useEffect(() => {
    Promise.all([
      dispatch(fetchGeo()),
      dispatch(fetchPrizes()),
      dispatch(fetchSystemConfig()),
      getUserAgent(),
      generateFingerprint(),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user?.id && user?.phone && user?.phone_verified) {
      dispatch(fetchBroadcastNotifications())
      dispatch(fetchPersonalNotifications({ user_id: user?.id }))
    }
  }, [dispatch, user?.id, user?.phone, user?.phone_verified])

  useEffect(() => {
    registerSW()
  }, [])

  // const { generate } = useGenerateLanguage()

  // useEffect(() => {
  //   const fetch = async () => await generate()
  //   fetch()
  // }, [generate])

  return children
}

export default memo(InitialStateProvider)
