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

const InitialStateProvider = ({ children }) => {
  const dispatch = useDispatch()
  const userTable = useSelector(selectUserTable)
  const { lang } = useSelector((state) => state.systemLanguage)
  const { generateFingerprint } = useGenerateFingerprint()
  const { getUserAgent } = useGetUserAgent()
  const { i18n } = useTranslation()

  useEffect(() => {
    const fetch = async () => await getUserAgent()

    Promise.all([
      dispatch(fetchGeo()),
      dispatch(fetchPrizes()),
      dispatch(fetchBroadcastNotifications()),
      dispatch(fetchSystemConfig()),
      generateFingerprint(),
      fetch(),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (userTable?.id && userTable?.phone && userTable?.phone_verified) {
      dispatch(fetchPersonalNotifications({ user_id: userTable?.id }))
    }
  }, [dispatch, userTable?.id, userTable?.phone, userTable?.phone_verified])

  useEffect(() => {
    if (lang !== userTable?.language && userTable?.id) {
      dispatch(
        setLanguage({
          lang: userTable?.language ?? LANGUAGE.uz,
          cb: (lang) => i18n.changeLanguage(lang),
        })
      )
    }
  }, [dispatch, lang, i18n, userTable?.id, userTable?.language])

  return children
}

export default memo(InitialStateProvider)
