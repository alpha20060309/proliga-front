'use client'

import GameNavigation from './components/GameNavigation'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentCompetition } from 'app/lib/features/competition/competition.slice'
import { setLastVisitedTeam } from 'app/lib/features/currentTeam/currentTeam.slice'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { fetchTourTeams } from 'app/lib/features/tourTeam/tourTeam.thunk'
import { fetchTours } from 'app/lib/features/tour/tour.thunk'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import { selectPrevTeam } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { use } from 'react'

const PlayLayout = ({ children, params }) => {
  const { league, id } = use(params)
  const dispatch = useDispatch()
  const userTable = useSelector(selectUserTable)
  const currentTeam = useSelector(selectCurrentTeam)
  const competitions = useSelector(selectCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const prevTeam = useSelector(selectPrevTeam)
  useEffect(() => {
    if (userTable?.id && id && league) {
      dispatch(fetchCurrentTeam({ id, user_id: userTable?.id }))
      dispatch(setLastVisitedTeam(`${league}/${id}`))
    }
  }, [id, league, dispatch, userTable?.id])

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
    if (league && currentTeam?.registered_tour_id) {
      dispatch(
        fetchTours({
          competition_id: league,
          registered_tour_id: currentTeam?.registered_tour_id,
        })
      )
    }
  }, [league, dispatch, currentTeam?.registered_tour_id])

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
    if (competitions?.length > 0 && league) {
      dispatch(setCurrentCompetition(league))
    }
  }, [dispatch, league, competitions?.length])

  return (
    <div className="flex w-full flex-col gap-4 py-4">
      <GameNavigation />
      {children}
    </div>
  )
}

export default PlayLayout
