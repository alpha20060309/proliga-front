'use client'

import GameNavigation from './components/GameNavigation'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { fetchTourTeams } from 'app/lib/features/tourTeam/tourTeam.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import { selectPrevTeam } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { use } from 'react'

const PlayLayout = ({ children, params }) => {
  const { league, id } = use(params)
  const dispatch = useDispatch()
  const currentTour = useSelector(selectCurrentTour)
  const prevTeam = useSelector(selectPrevTeam)

  useEffect(() => {
    if (id && currentTour?.id) {
      dispatch(
        fetchTeamPlayers({
          team_id: id,
          tour_id: currentTour.id,
          competition_id: league,
        })
      )
    }
  }, [id, league, currentTour?.id, dispatch])

  useEffect(() => {
    if (id && currentTour?.id) {
      dispatch(fetchTourTeams({ team_id: id, currentTour }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentTour?.id, dispatch])

  useEffect(() => {
    if (currentTour?.id && league && prevTeam?.length > 0) {
      dispatch(
        fetchPlayerPoint({
          competition_id: league,
          tour_id: currentTour.id,
          teamConcat: prevTeam,
        })
      )
    }
  }, [dispatch, currentTour?.id, league, prevTeam])

  return (
    <div className="flex w-full flex-col gap-4">
      <GameNavigation />
      {children}
    </div>
  )
}

export default PlayLayout
