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
import { fetchTopPlayers } from 'app/lib/features/player/player.thunk'
import { fetchAdditionalPlayers } from 'app/lib/features/player/player.thunk'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { fetchTopTeams } from 'app/lib/features/team/team.thunk'

export default function PlayLayout({ children }) {
  const [isModalOpen, setModalOpen] = useState(false)
  const { league } = useParams()
  const dispatch = useDispatch()
  const { count: playersCount } = useSelector((store) => store.player)
  const countOfPlayers = useMemo(
    () => [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    []
  )
  const currentCompetition = useSelector(selectCurrentCompetition)
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

  return (
    <main className="text-foreground bg-background relative flex min-h-[75vh] flex-col gap-4 overflow-hidden pt-10">
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
