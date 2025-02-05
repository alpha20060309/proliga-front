'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from '../lib/features/systemLanguage/systemLanguage.slice'
import { LANGUAGE } from '../utils/languages.util'
import { useTranslation } from 'react-i18next'
import { fetchSystemConfig } from '../lib/features/systemConfig/systemConfig.thunk'
import { useGenerateFingerprint } from 'app/hooks/system/useGenerateFingerprint/useGenerateFingerprint'
import { useUpdateUserFingerprint } from 'app/hooks/auth/useUpdateUserFingerprint/useUpdateUserFingerprint'
import { useUpdateUserGeo } from 'app/hooks/auth/useUpdateUserGeo/useUpdateUserGeo'
import { useGetUserAgent } from 'app/hooks/system/useGetUserAgent/useGetUserAgent'
import { fetchGeo } from 'app/lib/features/auth/auth.thunk'
import { fetchPrizes } from 'app/lib/features/prize/prize.thunk'
import {
  selectAgent,
  selectGeo,
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import {
  fetchBroadcastNotifications,
  fetchPersonalNotifications,
} from 'app/lib/features/systemNotification/systemNotification.thunk'

const InitialStateProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { fingerprint } = useSelector((state) => state.auth)
  const agent = useSelector(selectAgent)
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const geo = useSelector(selectGeo)

  const { lang } = useSelector((state) => state.systemLanguage)
  const { generateFingerprint } = useGenerateFingerprint()
  const { updateUserFingerprint } = useUpdateUserFingerprint()
  const { updateUserGeo } = useUpdateUserGeo()
  const { getUserAgent } = useGetUserAgent()
  const { i18n } = useTranslation()

  useEffect(() => {
    const fetch = async () => await getUserAgent()

    Promise.all([
      dispatch(fetchGeo()),
      dispatch(fetchSystemConfig()),
      dispatch(fetchPrizes()),
      dispatch(fetchBroadcastNotifications()),
      generateFingerprint(),
      fetch(),
    ])
  }, [dispatch, generateFingerprint, getUserAgent])

  useEffect(() => {
    if (userAuth?.id && userTable?.id) {
      dispatch(fetchPersonalNotifications({ user_id: userTable?.id }))
    }
  }, [dispatch, userAuth?.id, userTable?.id])

  useEffect(() => {
    if (lang !== userTable?.language && userTable?.id) {
      dispatch(setLanguage(userTable?.language ?? LANGUAGE.uz))
      i18n.changeLanguage(userTable?.language ?? LANGUAGE.uz)
    }
  }, [dispatch, lang, userTable?.language, i18n, userTable])

  // useEffect(() => {
  //   if (
  //     userTable?.guid &&
  //     userAuth?.id &&
  //     fingerprint &&
  //     userTable?.visitor !== fingerprint
  //   ) {
  //     updateUserFingerprint({ guid: userTable.guid, fingerprint })
  //   }
  // }, [fingerprint, userTable, userAuth, updateUserFingerprint])

  // useEffect(() => {
  //   const table = userTable?.geo && JSON.parse(userTable.geo)
  //   if (
  //     userTable?.id &&
  //     userAuth?.id &&
  //     geo?.city &&
  //     agent &&
  //     table?.ip !== geo?.ip
  //   ) {
  //     updateUserGeo({ id: userTable.guid, geo, agent })
  //   }
  // }, [fingerprint, userTable, userAuth, geo, updateUserGeo, agent])

  return children
}

export default InitialStateProvider
