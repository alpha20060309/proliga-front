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

export const useLogOut = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
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
        clearState()
        localStorage.clear()

        await signOut({
          redirect: true,
          callbackUrl: '/',
        })

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
    [clearState, t]
  )

  return { logOut, error }
}
