'use client'

const Championship = dynamic(() => import('./components/Championship'), {
  ssr: false,
  loading: () => <ChampionshipSkeleton />,
})
const ChampionshipsTitle = dynamic(() => import('./components/Title'), {
  ssr: false,
  loading: () => <Skeleton className="mb-6 h-7 w-48" />,
})
import dynamic from 'next/dynamic'
import { cn } from '@/lib/utils'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserTeams } from 'app/lib/features/team/team.thunk'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { fetchSeason } from 'app/lib/features/season/season.thunk'
import { ChampionshipSkeleton } from './components/Skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { selectUserTable } from 'app/lib/features/auth/auth.selector'

const Championships = () => {
  const dispatch = useDispatch()
  const competitions = useSelector(selectCompetition)
  const { isLoading: competitionLoading } = useSelector(
    (state) => state.competition
  )
  const userTable = useSelector(selectUserTable)
  const { season, isLoading: seasonLoading } = useSelector(
    (state) => state.season
  )
  const { isLoading: teamsLoading } = useSelector((state) => state.team)

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
    if (userTable?.id && season?.id) {
      dispatch(
        fetchUserTeams({
          user_id: userTable.id,
          season_id: season.id,
        })
      )
    }
  }, [dispatch, userTable?.id, season?.id])

  const isLoading = useMemo(
    () => competitionLoading || seasonLoading || teamsLoading,
    [competitionLoading, seasonLoading, teamsLoading]
  )

  return (
    <section
      className={cn(
        'mb-4 mt-8 min-h-[30rem] w-full rounded-lg border border-neutral-700',
        'bg-black/10 p-4 backdrop-blur sm:p-5 md:mt-6 md:min-h-48'
      )}
    >
      {isLoading ? (
        <Skeleton className="mb-6 h-7 w-48" />
      ) : (
        <ChampionshipsTitle />
      )}
      {isLoading ? (
        <section className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <ChampionshipSkeleton key={index} />
          ))}
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {competitions.map((game, index) => (
            <Championship key={index} game={game} />
          ))}
        </section>
      )}
    </section>
  )
}

export default Championships
