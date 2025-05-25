import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

const TopTeamsSkeleton = () => {
  return (
    <div className="flex h-min w-full flex-col gap-2 lg:w-1/3">
      <TopTeams />
      <TopPlayers />
    </div>
  )
}

const TopTeams = () => {
  return (
    <Card className="bg-background text-foreground w-full rounded-xl p-5">
      <Skeleton className="h-7 w-3/4 bg-neutral-500" />
      <div className="xs:grid-cols-3 mt-4 grid h-auto min-h-32 grid-cols-2 gap-2">
        {[1, 2, 3].map((index) => (
          <TeamPlaceSkeleton key={index} />
        ))}
      </div>
    </Card>
  )
}

const TeamPlaceSkeleton = () => {
  return (
    <div className="relative min-h-32 w-full rounded-sm bg-neutral-50/80 p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="size-8" />
        <Skeleton className="h-5 w-3/5 rounded-full bg-yellow-500" />
      </div>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="absolute right-0 bottom-0 size-6 rounded-tl-lg rounded-br-lg bg-yellow-500" />
    </div>
  )
}

const TopPlayers = () => {
  return (
    <Card className="bg-background text-foreground w-full rounded-xl p-5">
      <Skeleton className="h-7 w-3/4 bg-neutral-500" />
      <div className="xs:grid-cols-3 mt-4 grid grid-cols-2 gap-2">
        {[1, 2, 3].map((index) => (
          <PlayerPlaceSkeleton key={index} />
        ))}
      </div>
    </Card>
  )
}

const PlayerPlaceSkeleton = () => {
  return (
    <div className="relative min-h-32 rounded-sm bg-neutral-50/80 p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="h-5 w-3/5 rounded-full bg-yellow-500" />
      </div>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="absolute right-0 bottom-0 size-6 rounded-tl-lg rounded-br-lg bg-yellow-500" />
    </div>
  )
}

export default TopTeamsSkeleton
