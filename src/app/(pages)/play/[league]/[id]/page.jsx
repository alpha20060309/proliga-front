'use client'

import GameNavigation from '../../components/GameNavigation'
import CurrentTab from '../../components/CurrentTab'
import Spinner from 'components/Spinner'
import Gutter from 'components/Gutter'
import { cn } from '@/lib/utils'
import { useEffect, useMemo } from 'react'
import { TABS } from 'app/utils/tabs.util'
import { useSelector, useDispatch } from 'react-redux'
import { setTab } from 'app/lib/features/tours/tours.slice'
import { setCurrentCompetition } from 'app/lib/features/competition/competition.slice'
import { setLastVisitedTeam } from 'app/lib/features/currentTeam/currentTeam.slice'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayers/teamPlayers.thunk'
import { fetchAdditionalPlayers } from 'app/lib/features/players/players.thunk'
import { fetchTourTeams } from 'app/lib/features/tourTeams/tourTeams.thunk'
import { fetchPackages } from 'app/lib/features/packages/packages.thunk'
import { fetchTopPlayers } from 'app/lib/features/players/players.thunk'
import { fetchPlayers } from 'app/lib/features/players/players.thunk'
import { fetchBanners } from 'app/lib/features/banner/banner.thunk'
import { fetchSeason } from 'app/lib/features/season/season.thunk'
import { fetchTours } from 'app/lib/features/tours/tours.thunk'
import { fetchClubs } from 'app/lib/features/club/club.thunk'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import { selectTeamConcat } from 'app/lib/features/teamPlayers/teamPlayers.selector'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tours/tours.selector'
import { selectPackages } from 'app/lib/features/packages/packages.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const Play = ({ params }) => {
  const dispatch = useDispatch()
  const userTable = useSelector(selectUserTable)
  const currentTeam = useSelector(selectCurrentTeam)
  const competitions = useSelector(selectCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const packages = useSelector(selectPackages)
  const banners = useSelector(selectBanners)
  const { gameTab, isLoading: toursLoading } = useSelector(
    (state) => state.tours
  )
  const { isLoading: packagesLoading } = useSelector((store) => store.packages)
  const { isLoading: bannersLoading } = useSelector((store) => store.banner)
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam)
  const { isLoading: competitionsLoading } = useSelector(
    (state) => state.competition
  )
  const { season, isLoading: seasonLoading } = useSelector(
    (store) => store.season
  )
  const { count: playersCount, isLoading: playersLoading } = useSelector(
    (store) => store.players
  )
  const teamConcat = useSelector(selectTeamConcat)
  const countOfPlayers = useMemo(
    () => [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    []
  )

  const isLoading = useMemo(
    () =>
      toursLoading ||
      teamLoading ||
      playersLoading ||
      competitionsLoading ||
      seasonLoading ||
      packagesLoading ||
      bannersLoading,
    [
      toursLoading,
      teamLoading,
      playersLoading,
      competitionsLoading,
      seasonLoading,
      packagesLoading,
      bannersLoading,
    ]
  )

  useEffect(() => {
    if (competitions?.length === 0) {
      dispatch(fetchCompetition())
    }
    if (!season?.id) {
      dispatch(fetchSeason())
    }
    if (packages?.length === 0) {
      dispatch(fetchPackages())
    }
    if (banners?.length === 0) {
      dispatch(fetchBanners())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (userTable?.id && params?.id && params?.league) {
      dispatch(fetchCurrentTeam({ id: params.id, user_id: userTable?.id }))
      dispatch(setLastVisitedTeam(`${params.league}/${params.id}`))
    }
  }, [params, dispatch, userTable?.id])

  useEffect(() => {
    if (params?.id && currentTour?.id) {
      Promise.all([
        dispatch(
          fetchTeamPlayers({
            team_id: params.id,
            tour_id: currentTour.id,
            competition_id: params.league,
          })
        ),
        dispatch(fetchTourTeams({ team_id: params.id, currentTour })),
      ])
    }
  }, [params, currentTour, dispatch])

  useEffect(() => {
    if (params.league && currentTeam?.registered_tour_id) {
      dispatch(
        fetchTours({
          competition_id: params.league,
          registered_tour_id: currentTeam?.registered_tour_id,
        })
      )
    }
  }, [params.league, dispatch, currentTeam?.registered_tour_id])

  useEffect(() => {
    if (params.league) {
      Promise.all([
        dispatch(fetchClubs({ competition_id: params.league })),
        dispatch(
          fetchPlayers({
            competition_id: params.league,
          })
        ),
      ])
    }
  }, [dispatch, params.league])

  useEffect(() => {
    if (params.league && playersCount > 0) {
      dispatch(
        fetchTopPlayers({
          competition_id: params.league,
        })
      )
      countOfPlayers.map((pCount) => {
        if (playersCount > pCount) {
          dispatch(
            fetchAdditionalPlayers({
              competition_id: params.league,
              page: Math.ceil(pCount / 1000),
            })
          )
        }
      })
    }
  }, [dispatch, params.league, countOfPlayers, playersCount])

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
  }, [dispatch, currentTour?.id, params?.league, teamConcat])

  useEffect(() => {
    if (competitions?.length > 0 && params.league) {
      dispatch(setCurrentCompetition(params.league))
    }
  }, [dispatch, params.league, competitions?.length])

  useEffect(() => {
    if (
      currentTeam?.is_team_created === false ||
      currentTeam?.is_team_created === null
    ) {
      dispatch(setTab(TABS.Transfer))
    }
  }, [dispatch, currentTeam?.is_team_created])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main
      className={cn(
        'flex flex-col gap-4 overflow-hidden bg-gradient-to-tr',
        'from-red-800 to-blue-900 text-neutral-700',
        gameTab === TABS.GameProfile || gameTab === TABS.Transfer
          ? 'pb-4 pt-20'
          : 'pb-7 pt-16'
      )}
    >
      <GameNavigation currentTab={gameTab} />
      <Gutter>
        <CurrentTab currentTab={gameTab} />
      </Gutter>
    </main>
  )
}

export default Play
