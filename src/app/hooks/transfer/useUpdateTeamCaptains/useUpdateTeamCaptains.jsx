import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { useTranslation } from 'react-i18next'

export const useUpdateTeamCaptains = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const updateTeamCaptains = useCallback(
    async ({ team, team_id, tour_id, currentCompetition, userTable }) => {
      setIsLoading(false)
      setError(null)

      try {
        setIsLoading(true)

        const newTeam = team.map((player) => ({
          id: player.id,
          team_id,
          tour_id,
          user_id: userTable.id,
          is_captain: player.is_captain,
        }))

        const { data, error } = await supabase
          .from('team_player')
          .upsert(newTeam)
          .is('deleted_at', null)
          .select()

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred'),
            { theme: 'dark' }
          )
          return
        }
        if (data) {
          dispatch(
            fetchTeamPlayers({
              team_id,
              tour_id,
              competition_id: currentCompetition.id,
            })
          )
          toast.success(t('Kapitan yangilandi'), { theme: 'dark' })
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred'),
          { theme: 'dark' }
        )
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, t]
  )
  return { updateTeamCaptains, isLoading, error }
}
