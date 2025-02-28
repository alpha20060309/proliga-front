/* eslint-disable no-unused-vars */
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAuth, setUserTable } from '../lib/features/auth/auth.slice'
import { usePathname, useRouter } from 'next/navigation'
import { useCheckUserExists } from 'app/hooks/auth/useCheckUserExists/useCheckUserExists'
import { CONFIG_KEY } from 'app/utils/config.util'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { toast } from 'react-toastify'
import {
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { setLanguage } from 'app/lib/features/systemLanguage/systemLanguage.slice'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const path = usePathname()
  const { i18n } = useTranslation()
  const router = useRouter()
  const { is_checked } = useSelector((state) => state.auth)
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const { checkUserExists } = useCheckUserExists()
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { logOut } = useLogOut()
  const { data: session } = useSession()

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
  //   const auth =
  //     localStorage.getItem(`user-auth-${sbUrl}`) &&
  //     JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
  //   const table =
  //     localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
  //     JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

  //   if (auth?.id && table?.id && !userAuth && !userTable) {
  //     dispatch(setUserAuth(auth))
  //     dispatch(setUserTable(table))
  //   }
  //   if ((!auth || !table) && path.slice(1, 5) === 'play') {
  //     router.push('/')
  //   }
  // }, [dispatch, userAuth, userTable, router, path, logOut])

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
  //   const auth =
  //     localStorage.getItem(`user-auth-${sbUrl}`) &&
  //     JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
  //   const table =
  //     localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
  //     JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

  //   const lang = localStorage.getItem('lang')

  //   if (!auth?.id && !table?.id && (lang !== 'undefined' || lang !== 'null')) {
  //     dispatch(setLanguage({ lang, cb: (lang) => i18n.changeLanguage(lang) }))
  //   }
  // }, [dispatch, i18n])

  // useEffect(() => {
  //   if (
  //     userTable?.guid &&
  //     userAuth?.id &&
  //     !path.includes('auth') &&
  //     !path.includes('confirm-otp') &&
  //     !is_checked
  //   ) {
  //     const fetch = async () => {
  //       await checkUserExists({ guid: userTable?.guid })
  //     }
  //     fetch()
  //   }
  // }, [userTable, userAuth, checkUserExists, path, is_checked])

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
  //   const session =
  //     localStorage.getItem(`sb-${sbUrl}-auth-token`) &&
  //     JSON.parse(localStorage.getItem(`sb-${sbUrl}-auth-token`))
  //   const auth =
  //     localStorage.getItem(`user-auth-${sbUrl}`) &&
  //     JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
  //   const table =
  //     localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
  //     JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

  //   if (
  //     !path.includes('auth') &&
  //     !path.includes('confirm-otp') &&
  //     session?.user?.id &&
  //     !auth?.id &&
  //     !table?.id
  //   ) {
  //     const fetch = async () => await logOut({ showMessage: false })
  //     fetch()
  //   }
  // }, [path, logOut])

  // useEffect(() => {
  //   const existing_app_version = localStorage.getItem('app_version') || ''

  //   if (
  //     userTable?.guid &&
  //     userAuth?.id &&
  //     app_version &&
  //     existing_app_version &&
  //     app_version !== existing_app_version
  //   ) {
  //     const fetch = async () => {
  //       await logOut({ showMessage: false })
  //     }

  //     toast.warning(
  //       'Ilova yangilandi. Iltimos, tizimga qayta kiring. Noqulayliklar uchun uzr soʻraymiz.',
  //       { theme: 'dark', autoClose: 5000 }
  //     )
  //     fetch()
  //   }
  // }, [app_version, userAuth?.id, userTable, logOut])

  useEffect(() => {
    if (session?.user) {
      dispatch(setUserTable(session.user))
    }
  }, [session, dispatch])

  return <>{children}</>
}

export default AuthProvider
