import RankingTeams from './Teams'
import RankingPlayers from './Players'
import { useSelector } from 'react-redux'
import TopTeamsSkeleton from './Skeleton'
import { useMemo } from 'react'
import { memo } from 'react'

const TopTeams = () => {
  const { isLoading: teamsLoading } = useSelector((store) => store.team)
  const { isLoading: playersLoading } = useSelector((store) => store.player)

  const isLoading = useMemo(
    () => teamsLoading || playersLoading,
    [teamsLoading, playersLoading]
  )

  if (isLoading) return <TopTeamsSkeleton />

  return (
    <div className="flex h-min w-full flex-col gap-2 lg:w-1/3">
      <RankingTeams />
      <RankingPlayers />
    </div>
  )
}

export default memo(TopTeams)
