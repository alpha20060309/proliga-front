'use client'

import GameNavigation from '../../components/GameNavigation'
import CurrentTab from '../../components/CurrentTab'
import Spinner from 'components/Spinner'
import Gutter from 'shared/Gutter'
import { cn } from '@/lib/utils'
import { useEffect, useMemo } from 'react'
import { TABS } from 'app/utils/tabs.util'
import { useSelector, useDispatch } from 'react-redux'
import { setTab } from 'app/lib/features/tour/tour.slice'
import { setCurrentCompetition } from 'app/lib/features/competition/competition.slice'
import { setLastVisitedTeam } from 'app/lib/features/currentTeam/currentTeam.slice'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayer/teamPlayer.thunk'
import { fetchAdditionalPlayers } from 'app/lib/features/player/player.thunk'
import { fetchTourTeams } from 'app/lib/features/tourTeam/tourTeam.thunk'
import { fetchPackages } from 'app/lib/features/package/package.thunk'
import { fetchTopPlayers } from 'app/lib/features/player/player.thunk'
import { fetchPlayers } from 'app/lib/features/player/player.thunk'
import { fetchBanners } from 'app/lib/features/banner/banner.thunk'
import { fetchSeason } from 'app/lib/features/season/season.thunk'
import { fetchTours } from 'app/lib/features/tour/tour.thunk'
import { fetchClubs } from 'app/lib/features/club/club.thunk'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import { selectPrevTeam } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { selectPackages } from 'app/lib/features/package/package.selector'
import { selectBanners } from 'app/lib/features/banner/banner.selector'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { use } from 'react'
import { useTransitionRouter } from 'next-view-transitions'
import { toast } from 'sonner'

const Play = (props) => {
  const router = useTransitionRouter()
  const { league, id } = use(props.params)
  const dispatch = useDispatch()
  const userTable = useSelector(selectUserTable)
  const currentTeam = useSelector(selectCurrentTeam)
  const competitions = useSelector(selectCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const packages = useSelector(selectPackages)
  const banners = useSelector(selectBanners)
  const { gameTab, isLoading: toursLoading } = useSelector(
    (state) => state.tour
  )
  const { isLoading: packagesLoading } = useSelector((store) => store.package)
  const { isLoading: bannersLoading } = useSelector((store) => store.banner)
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam)
  const { isLoading: competitionsLoading } = useSelector(
    (state) => state.competition
  )
  const { season, isLoading: seasonLoading } = useSelector(
    (store) => store.season
  )
  const { count: playersCount, isLoading: playersLoading } = useSelector(
    (store) => store.player
  )
  const prevTeam = useSelector(selectPrevTeam)
  const countOfPlayers = useMemo(
    () => [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    []
  )

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (!isAuthenticated) {
      router.push('/')
      toast.error('Please login first')
    }
  }, [router])

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
  }, [dispatch, competitions?.length])

  useEffect(() => {
    if (!season?.id) {
      dispatch(fetchSeason())
    }
  }, [dispatch, season?.id])

  useEffect(() => {
    if (packages?.length === 0) {
      dispatch(fetchPackages())
    }
  }, [dispatch, packages?.length])

  useEffect(() => {
    if (banners?.length === 0) {
      dispatch(fetchBanners())
    }
  }, [dispatch, banners?.length])

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
    if (league) {
      Promise.all([
        dispatch(fetchClubs({ competition_id: league })),
        dispatch(
          fetchPlayers({
            competition_id: league,
          })
        ),
      ])
    }
  }, [dispatch, league])

  useEffect(() => {
    if (league && playersCount > 0) {
      dispatch(
        fetchTopPlayers({
          competition_id: league,
        })
      )
      countOfPlayers.map((pCount) => {
        if (playersCount > pCount) {
          dispatch(
            fetchAdditionalPlayers({
              competition_id: league,
              page: Math.ceil(pCount / 1000),
            })
          )
        }
      })
    }
  }, [dispatch, league, countOfPlayers, playersCount])

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

  useEffect(() => {
    if (
      currentTeam?.is_team_created === false ||
      currentTeam?.is_team_created === null
    ) {
      dispatch(setTab(TABS.Transfer))
    } else {
      const hash = window.location.hash.slice(1)
      if (hash && Object.values(TABS).includes(hash)) {
        dispatch(setTab(hash))
      }
    }
  }, [dispatch, currentTeam?.is_team_created])


  if (isLoading) {
    return <Spinner />
  }

  return (
    <main
      className={cn(
        'flex flex-col gap-4 overflow-hidden bg-linear-to-tr',
        'from-chart-1 to-chart-2 text-foreground',
        gameTab === TABS.GameProfile || gameTab === TABS.Transfer
          ? 'pt-20 pb-4'
          : 'pt-16 pb-7'
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
