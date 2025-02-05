import { Skeleton } from '@/components/ui/skeleton'

export function ChampionshipSkeleton() {
  return (
    <div className="flex h-28 items-center space-x-4 rounded-lg border border-neutral-700 bg-black/25 px-3">
      <Skeleton className="h-14 min-w-14 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="h-5 w-full md:h-7" />
        <Skeleton className="h-4 w-3/4 md:h-6" />
      </div>
    </div>
  )
}
