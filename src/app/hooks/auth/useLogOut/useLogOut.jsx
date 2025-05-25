import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setUserTable } from '../../../lib/features/auth/auth.slice'
import { clearNotifications } from 'app/lib/features/systemNotification/systemNotification.slice'
import {
  resetCurrentTeam,
  setLastVisitedTeam,
} from 'app/lib/features/currentTeam/currentTeam.slice'
import { resetTeams } from 'app/lib/features/team/team.slice'
import { signOut } from 'next-auth/react'
import { useTransitionRouter } from 'next-view-transitions'
import { useUpdateUserNotificationInfo } from 'app/hooks/user/useUpdateUserNotificationInfo/useUpdateUserNotificationInfo'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'

export const useLogOut = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUserTable)
  const { updateNotificationToken } = useUpdateUserNotificationInfo()
  const [error, setError] = useState(null)
  const router = useTransitionRouter()
  const { t } = useTranslation()

  const clearState = useCallback(() => {
    dispatch(setUserTable(null))
    dispatch(clearNotifications())
    dispatch(resetCurrentTeam())
    dispatch(resetTeams())
    dispatch(setLastVisitedTeam(''))
  }, [dispatch])

  const logOut = useCallback(
    async ({ showMessage = true, cb = () => {} } = {}) => {
      try {
        await updateNotificationToken({
          notification_token: null,
          userTable: user,
        })

        // First clear state and storage before sign out
        clearState()
        localStorage.clear()

        // Clear IndexedDB
        const databases = await window.indexedDB.databases()
        databases.forEach((db) => {
          window.indexedDB.deleteDatabase(db.name)
        })

        // Clear Cache Storage
        if ('caches' in window) {
          const cacheKeys = await caches.keys()
          await Promise.all(cacheKeys.map((key) => caches.delete(key)))
        }

        // Clear cookies
        document.cookie.split(';').forEach((cookie) => {
          document.cookie = cookie
            .replace(/^ +/, '')
            .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
        })

        // Call signOut with callbackUrl to prevent CSRF issues
        await signOut({
          redirect: true,
          callbackUrl: '/',
        })

        // No need for manual redirect as we're using redirect: true
        if (showMessage) {
          toast.success(t('Tizimdan chiqdingiz'))
        }
        cb()
      } catch (error) {
        setError(error)
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
      }
    },
    [clearState, t, user, updateNotificationToken]
  )

  return { logOut, error }
}
