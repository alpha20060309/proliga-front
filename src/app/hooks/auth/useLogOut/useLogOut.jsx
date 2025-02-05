import { toast } from 'react-toastify'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  setChecked,
  setUserAuth,
  setUserTable,
} from '../../../lib/features/auth/auth.slice'
import { useRouter } from 'next/navigation'
import { clearNotifications } from 'app/lib/features/systemNotification/systemNotification.slice'
import {
  resetCurrentTeam,
  setLastVisitedTeam,
} from 'app/lib/features/currentTeam/currentTeam.slice'
import { resetTeams } from 'app/lib/features/teams/teams.slice'
import { supabase } from 'app/lib/supabaseClient'

export const useLogOut = () => {
  const dispatch = useDispatch()
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
  const router = useRouter()
  const { t } = useTranslation()

  const clearState = useCallback(() => {
    dispatch(setUserAuth(null))
    dispatch(setUserTable(null))
    dispatch(setChecked(false))
    dispatch(clearNotifications())
    dispatch(resetCurrentTeam())
    dispatch(resetTeams())
    dispatch(setLastVisitedTeam(''))
  }, [dispatch])

  const logOut = useCallback(
    async ({ showMessage = true } = {}) => {
      try {
        const { error } = await supabase.auth.signOut()

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
        }

        clearState()
        localStorage.clear()

        router.push('/')
        if (showMessage) {
          toast.success(t('Tizimdan chiqdingiz'), { theme: 'dark' })
        }
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred'),
          { theme: 'dark' }
        )
      }
    },
    [clearState, router, t]
  )

  return { logOut }
}
