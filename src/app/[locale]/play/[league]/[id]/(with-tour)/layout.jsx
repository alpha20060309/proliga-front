'use client'

import Gutter from 'components/Gutter'
import GameNavigation from './components/GameNavigation'
import { useEffect, use } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTourTeams } from 'app/lib/features/tourTeam/tourTeam.thunk'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import { selectCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.selector'
import { selectPrevTeam } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectTourTeams } from 'app/lib/features/tourTeam/tourTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { setCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.slice'
import { selectTours } from 'app/lib/features/tour/tour.selector'

const PlayLayout = ({ children, params }) => {
  const { league, id } = use(params)
  const dispatch = useDispatch()
  const currentTour = useSelector(selectCurrentTour)
  const prevTeam = useSelector(selectPrevTeam)
  const tourTeams = useSelector(selectTourTeams)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const selectedTours = useSelector(selectTours)

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

  useEffect(() => {
    if (selectedTours?.length > 0 && tourTeams?.length > 0) {
      if (currentTour?.id !== currentTourTeam?.tour_id) {
        dispatch(setCurrentTourTeam(currentTour))
      }
    }
  }, [dispatch, selectedTours?.length, currentTourTeam, tourTeams?.length, currentTour])

  return (
    <div className="flex w-full flex-col gap-4">
      <Gutter mobileFriendly>
        <GameNavigation />
      </Gutter>
      <Gutter mobileFriendly>{children}</Gutter>
    </div>
  )
}

export default PlayLayout
