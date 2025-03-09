'use client'

import TeamProfile from '../../components/TeamProfile'
import TeamTabs from '../../components/GameNavigation'
import Gutter from 'components/Gutter'
import { useEffect, useMemo } from 'react'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSeason } from 'app/lib/features/season/season.thunk'
import { fetchBanners } from 'app/lib/features/banner/banner.thunk'
import { fetchTeamViewTours } from 'app/lib/features/tour/tour.thunk'
import { fetchTourTeams } from 'app/lib/features/tourTeam/tourTeam.thunk'
import { emptyTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import { fetchSelectedTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { selectTeamConcat } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { setCurrentCompetition } from 'app/lib/features/competition/competition.slice'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import Spinner from 'components/Spinner'

const TeamView = ({ params }) => {
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const competitions = useSelector(selectCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const teamConcat = useSelector(selectTeamConcat)
  const { season, isLoading: seasonLoading } = useSelector(
    (store) => store.season
  )
  const banners = useSelector(selectBanners)
  const { isLoading: toursLoading } = useSelector((state) => state.tour)
  const { isLoading: bannersLoading } = useSelector((store) => store.banner)
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam)
  const { isLoading: competitionsLoading } = useSelector(
    (state) => state.competition
  )

  const isLoading = useMemo(
    () =>
      toursLoading ||
      teamLoading ||
      competitionsLoading ||
      seasonLoading ||
      bannersLoading,
    [
      toursLoading,
      teamLoading,
      competitionsLoading,
      seasonLoading,
      bannersLoading,
    ]
  )

  useEffect(() => {
    if (competitions?.length === 0) {
      dispatch(fetchCompetition())
    }
  }, [dispatch, competitions?.length])

  useEffect(() => {
    if (!season?.id) {
      dispatch(fetchSeason())
    }
  }, [dispatch, season?.id])

  useEffect(() => {
    if (banners?.length === 0) {
      dispatch(fetchBanners())
    }
  }, [dispatch, banners?.length])

  useEffect(() => {
    if (params?.id) {
      dispatch(fetchSelectedTeam({ id: params.id }))
    }
  }, [dispatch, params?.id])

  useEffect(() => {
    if (params.league && currentTeam?.registered_tour_id) {
      dispatch(
        fetchTeamViewTours({
          competition_id: params.league,
          registered_tour_id: currentTeam?.registered_tour_id,
        })
      )
    }
  }, [currentTeam, dispatch, params?.league, currentTeam?.registered_tour_id])

  useEffect(() => {
    if (
      params?.id &&
      params?.league &&
      currentTour?.id &&
      currentTour?.status !== TOUR_STATUS.notStartedTransfer
    ) {
      dispatch(
        fetchTeamPlayers({
          team_id: params?.id,
          competition_id: params.league,
          tour_id: currentTour.id,
        })
      )
    }
  }, [params, currentTour, dispatch])

  useEffect(() => {
    if (currentTour?.id && params?.league && teamConcat?.length > 0) {
      dispatch(
        fetchPlayerPoint({
          competition_id: params.league,
          tour_id: currentTour.id,
          teamConcat: teamConcat,
        })
      )
    }
  }, [teamConcat, dispatch, currentTour?.id, params?.league])

  useEffect(() => {
    if (competitions?.length > 0 && params.league) {
      dispatch(setCurrentCompetition(params.league))
    }
  }, [dispatch, params?.league, competitions?.length])

  useEffect(() => {
    if (params.id && currentTour?.id) {
      dispatch(
        fetchTourTeams({
          team_id: params.id,
          currentTour,
        })
      )
    }
  }, [params?.id, dispatch, currentTour])

  useEffect(() => {
    if (currentTour?.status === TOUR_STATUS.notStartedTransfer) {
      dispatch(emptyTeamPlayers())
    }
  }, [dispatch, currentTour?.status])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="flex flex-col gap-4 overflow-hidden bg-gradient-to-tr from-red-800 to-blue-900 pt-20 text-neutral-700">
      <Gutter>
        <section className="flex flex-col gap-4 overflow-hidden">
          <TeamTabs />
          <TeamProfile />
        </section>
      </Gutter>
    </div>
  )
}

export default TeamView
