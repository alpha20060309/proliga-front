'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import { fetchSeason } from 'app/lib/features/season/season.thunk'
import { fetchPackages } from 'app/lib/features/package/package.thunk'
import { fetchBanners } from 'app/lib/features/banner/banner.thunk'
import { fetchClubs } from 'app/lib/features/club/club.thunk'
import { fetchPlayers } from 'app/lib/features/player/player.thunk'
import Image from 'next/image'
import ModalBanner from 'components/Banners/Modal'
import Spinner from 'components/Spinner'
import { fetchTopPlayers } from 'app/lib/features/player/player.thunk'
import { fetchAdditionalPlayers } from 'app/lib/features/player/player.thunk'
import {
  selectCompetition,
  selectCurrentCompetition,
} from 'app/lib/features/competition/competition.selector'
import { fetchTopTeams } from 'app/lib/features/team/team.thunk'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { setLastVisitedTeam } from 'app/lib/features/currentTeam/currentTeam.slice'
import { setCurrentCompetition } from 'app/lib/features/competition/competition.slice'
import { fetchTours } from 'app/lib/features/tour/tour.thunk'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'

export default function PlayLayout({ children }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const { league, id } = useParams()
  const user = useSelector(selectUserTable)
  const dispatch = useDispatch()
  const { count: playersCount, isLoading: isLoadingPlayer } = useSelector(
    (store) => store.player
  )
  const countOfPlayers = useMemo(
    () => [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    []
  )
  const currentCompetition = useSelector(selectCurrentCompetition)
  const competitions = useSelector(selectCompetition)
  const currentTeam = useSelector(selectCurrentTeam)
  const { isLoading: isLoadingTeam } = useSelector((state) => state.team)
  const { isLoading: isLoadingTour } = useSelector((state) => state.tour)
  const { isLoading: isLoadingPackages } = useSelector((state) => state.package)
  const { isLoading: isLoadingBanners } = useSelector((state) => state.banner)
  const { isLoading: isLoadingSeason } = useSelector((state) => state.season)
  const { isLoading: isLoadingCompetition } = useSelector(
    (state) => state.competition
  )

  const isLoading =
    isLoadingPlayer ||
    isLoadingTeam ||
    isLoadingTour ||
    isLoadingPackages ||
    isLoadingBanners ||
    isLoadingSeason ||
    isLoadingCompetition

  useEffect(() => {
    dispatch(fetchCompetition())
    dispatch(fetchSeason())
    dispatch(fetchPackages())
    dispatch(fetchBanners())
  }, [dispatch])

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
    if (currentCompetition?.id) {
      dispatch(
        fetchTopTeams({
          competition_id: currentCompetition?.id,
        })
      )
    }
  }, [currentCompetition?.id, dispatch])

  useEffect(() => {
    if (user?.id && id && league) {
      dispatch(fetchCurrentTeam({ id, user_id: user?.id }))
      dispatch(setLastVisitedTeam(`${league}/${id}`))
    }
  }, [id, league, dispatch, user?.id])

  useEffect(() => {
    if (competitions?.length > 0 && league) {
      dispatch(setCurrentCompetition(league))
    }
  }, [dispatch, league, competitions?.length])

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

  if (isLoading) {
    return <Spinner />
  }
  return (
    <main className="text-foreground bg-background relative flex min-h-[75vh] flex-col gap-4 overflow-hidden pt-14 pb-2">
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/Hero.png"
          alt="Hero background"
          fill
          priority
          className="animate-in fade-in object-cover duration-500"
          quality={100}
        />
        <div className="animate-in fade-in absolute inset-0 bg-black/30 duration-500 dark:bg-black/60" />
      </div>
      {children}
      <ModalBanner isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </main>
  )
}
