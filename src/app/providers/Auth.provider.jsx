/* eslint-disable no-undef */
'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAuth, setUserTable } from '../lib/features/auth/auth.slice'
import { usePathname, useRouter } from 'next/navigation'
import { useCheckUserExists } from 'app/hooks/auth/useCheckUserExists/useCheckUserExists'
import { CONFIG_KEY } from 'app/utils/config.util'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { toast } from 'react-toastify'
import AuthListener from 'components/AuthListener'
import {
  selectUserAuth,
  selectUserTable,
} from 'app/lib/features/auth/auth.selector'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const path = usePathname()
  const router = useRouter()
  const { is_checked } = useSelector((state) => state.auth)
  const userTable = useSelector(selectUserTable)
  const userAuth = useSelector(selectUserAuth)
  const { checkUserExists } = useCheckUserExists()
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { logOut } = useLogOut()

  useEffect(() => {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

    if (auth?.id && table?.id && !userAuth && !userTable) {
      dispatch(setUserAuth(auth))
      dispatch(setUserTable(table))
    }
    // if (auth && !auth.session?.access_token && table?.email) {
    //   logOut({ showMessage: false })
    // }
    if ((!auth || !table) && path.slice(1, 5) === 'play') {
      router.push('/')
    }
  }, [dispatch, userAuth, userTable, router, path, logOut])

  useEffect(() => {
    if (
      userTable?.guid &&
      userAuth?.id &&
      !path.includes('auth') &&
      !path.includes('confirm-otp') &&
      !is_checked
    ) {
      const fetch = async () => {
        await checkUserExists({ guid: userTable?.guid })
      }
      fetch()
    }
  }, [userTable, userAuth, checkUserExists, path, is_checked])

  useEffect(() => {
    const existing_app_version = localStorage.getItem('app_version') || ''

    if (
      userTable?.guid &&
      userAuth?.id &&
      app_version &&
      existing_app_version &&
      app_version !== existing_app_version
    ) {
      const fetch = async () => {
        await logOut({ showMessage: false })
      }

      toast.warning(
        'Ilova yangilandi. Iltimos, tizimga qayta kiring. Noqulayliklar uchun uzr soʻraymiz.',
        { theme: 'dark', autoClose: 5000 }
      )
      fetch()
    }
  }, [app_version, userAuth?.id, userTable, logOut])

  return (
    <>
      <AuthListener />
      {children}
    </>
  )
}

export default AuthProvider
