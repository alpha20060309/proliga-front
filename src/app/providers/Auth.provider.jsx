// /* eslint-disable no-unused-vars */
// 'use client'

// import { useEffect, memo } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setUserTable } from '../lib/features/auth/auth.slice'
// import { usePathname, useRouter } from 'next/navigation'
// import { CONFIG_KEY } from 'app/utils/config.util'
// import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
// import { toast } from 'react-toastify'
// import { selectUserTable } from 'app/lib/features/auth/auth.selector'
// import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
// import { useTranslation } from 'react-i18next'
// import { useSession } from 'next-auth/react'
// import { useState } from 'react'

// const AuthProvider = ({ children }) => {
//   const { t } = useTranslation()
//   const dispatch = useDispatch()
//   const path = usePathname()
//   const user = useSelector(selectUserTable)
//   const config = useSelector(selectSystemConfig)
//   const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
//   const { logOut } = useLogOut()
//   const { data: session } = useSession()
//   const [loggedOut, setLoggedOut] = useState(false)

//   useEffect(() => {
//     if (path.includes('auth') || path.includes('confirm-otp')) {
//       return
//     }
//     if (!session?.user.id && !loggedOut) {
//       return
//     }
//     if (!session?.user?.phone || !session?.user?.email) {
//       const fetch = async () =>
//         await logOut({
//           showMessage: false,
//           cb: () => {
//             toast.warning(
//               t(
//                 'Your registration was not successfully completed, so we are logging you out for security reasons.'
//               )
//             )
//             setLoggedOut(false)
//           },
//         })

//       !loggedOut && fetch()
//       setLoggedOut(true)
//       return
//     } else if (session?.user?.id && !session?.user?.phone_verified) {
//       const fetch = async () =>
//         await logOut({
//           showMessage: false,
//           cb: () => {
//             toast.warning(toast.warning(t('Phone verified is false')))
//             setLoggedOut(false)
//           },
//         })

//       !loggedOut && fetch()
//       return
//     }
//   }, [path, session?.user, t, logOut, loggedOut])

//   // useEffect(() => {
//   //   if (path.includes('auth') || path.includes('confirm-otp')) {
//   //     return
//   //   }
//   //   if (!user?.phone_verified && user?.id) {
//   //     const fetch = async () =>
//   //       await logOut({
//   //         showMessage: false,
//   //       })
//   //     fetch()
//   //     toast.warning(t('Phone verified is false'))

//   //     return
//   //   }
//   // }, [logOut, path, t, user, session?.user?.id])

//   useEffect(() => {
//     const existing_app_version = localStorage.getItem('app_version') || ''

//     if (
//       user?.id &&
//       app_version &&
//       existing_app_version &&
//       app_version !== existing_app_version
//     ) {
//       const fetch = async () => {
//         await logOut({ showMessage: false })
//       }

//       toast.warning(
//         t(
//           'Ilova yangilandi. Iltimos, tizimga qayta kiring. Noqulayliklar uchun uzr soʻraymiz.'
//         ),
//         { autoClose: 5000 }
//       )
//       fetch()
//     }
//   }, [app_version, user, logOut, t])

//   useEffect(() => {
//     if (session !== undefined) {
//       dispatch(setUserTable(session?.user))
//     }
//   }, [session, dispatch])

//   return <>{children}</>
// }

// export default memo(AuthProvider)
'use client'

import { useEffect, memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserTable } from '../lib/features/auth/auth.slice'
import { usePathname } from 'next/navigation'
import { CONFIG_KEY } from 'app/utils/config.util'
import { useLogOut } from 'app/hooks/auth/useLogOut/useLogOut'
import { toast } from 'react-toastify'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

const AuthProvider = ({ children }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const path = usePathname()
  const user = useSelector(selectUserTable)
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { logOut } = useLogOut()
  const { data: session } = useSession()
  const [logoutInProgress, setLogoutInProgress] = useState(false)

  useEffect(() => {
    if (session !== undefined) {
      dispatch(setUserTable(session?.user || {}))
    }
  }, [session, dispatch])

  useEffect(() => {
    // Skip checks on auth and OTP confirmation pages
    if (path.includes('auth') || path.includes('confirm-otp')) {
      return
    }

    // Prevent executing if logout is already in progress or if session is not loaded yet
    if (logoutInProgress || session === undefined) {
      return
    }

    const performLogout = async (message) => {
      if (logoutInProgress) return

      setLogoutInProgress(true)
      await logOut({
        showMessage: false,
        cb: () => {
          toast.warning(message)
          setLogoutInProgress(false)
        },
      })
    }

    // Case 1: User is logged in but missing required profile data
    if (session?.user?.id && (!session.user?.phone || !session.user?.email)) {
      performLogout(
        t(
          'Your registration was not successfully completed, so we are logging you out for security reasons.'
        )
      )
      return
    }

    // Case 2: User is logged in but phone is not verified
    // if (
    //   session?.user?.id &&
    //   !session?.user?.phone_verified &&
    //   !path.includes('settings')
    // ) {
    //   performLogout(t('Phone verified is false'))
    //   return
    // }
  }, [path, session, t, logOut, logoutInProgress])

  // Handle app version changes
  useEffect(() => {
    const existing_app_version = localStorage.getItem('app_version') || null
    console.log(existing_app_version)
    if (
      user?.id &&
      app_version &&
      existing_app_version &&
      existing_app_version !== 'null' &&
      existing_app_version !== 'undefined' &&
      app_version !== existing_app_version &&
      !logoutInProgress
    ) {
      const performLogout = async () => {
        setLogoutInProgress(true)
        await logOut({
          showMessage: false,
          cb: () => setLogoutInProgress(false),
        })
      }

      toast.warning(
        t(
          'Ilova yangilandi. Iltimos, tizimga qayta kiring. Noqulayliklar uchun uzr soʻraymiz.'
        ),
        {
          autoClose: 5000,
        }
      )

      performLogout()
    }
  }, [app_version, user, logOut, t, logoutInProgress])

  return <>{children}</>
}

export default memo(AuthProvider)
