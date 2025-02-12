import { useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { useTranslation } from 'react-i18next'

export const useUpdateTeamPlayers = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const updateTeamPlayers = useCallback(
    async ({ team, team_id, tour_id, userTable, currentCompetition }) => {
      setIsLoading(false)
      setError(null)

      try {
        setIsLoading(true)

        const newTeam = team.map((player) => ({
          id: player.id,
          player_id: player.player_id,
          team_id,
          tour_id,
          user_id: userTable.id,
          is_captain: player.is_captain,
        }))

        const { error } = await supabase
          .from('team_player')
          .upsert(newTeam)
          .is('deleted_at', null)

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
        if (!error) {
          dispatch(
            fetchTeamPlayers({
              team_id,
              tour_id,
              competition_id: currentCompetition.id,
            })
          )
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

  return { updateTeamPlayers, isLoading, error }
}
