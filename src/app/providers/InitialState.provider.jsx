'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../lib/features/systemLanguage/systemLanguage.slice'
import { LANGUAGE } from '../utils/languages.util'
import { useTranslation } from 'react-i18next'
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

const InitialStateProvider = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserTable)
  const { lang } = useSelector((state) => state.systemLanguage)
  const { generateFingerprint } = useGenerateFingerprint()
  const { getUserAgent } = useGetUserAgent()
  const { i18n } = useTranslation()

  useEffect(() => {
    Promise.all([
      dispatch(fetchGeo()),
      dispatch(fetchPrizes()),
      dispatch(fetchBroadcastNotifications()),
      dispatch(fetchSystemConfig()),
      generateFingerprint(),
      getUserAgent(),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (user?.id && user?.phone && user?.phone_verified) {
      dispatch(fetchPersonalNotifications({ user_id: user?.id }))
    }
  }, [dispatch, user?.id, user?.phone, user?.phone_verified])

  useEffect(() => {
    if (lang !== user?.language && user?.id) {
      dispatch(
        setLanguage({
          lang: user?.language ?? LANGUAGE.uz,
          cb: (lang) => i18n.changeLanguage(lang),
        })
      )
    }
  }, [dispatch, lang, i18n, user?.id, user?.language])

  useEffect(() => {
    registerSW()
  }, [])

  return children
}

export default memo(InitialStateProvider)
