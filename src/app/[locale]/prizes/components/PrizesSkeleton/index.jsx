'use client'
import { Skeleton } from '@/components/ui/skeleton'

export function PrizesSkeleton({ count = 4 }) {
  return (
    <>
      <Skeleton className="bg-muted mb-4 h-12 w-48" />
      <section className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:grid-rows-2">
        {[...Array(count)].map((_, index) => (
          <CompetitionSkeleton key={index} />
        ))}
      </section>
    </>
  )
}

export function PrizeSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Skeleton className="bg-muted mb-2 h-4 w-24" />
      <Skeleton className="bg-muted h-full min-h-56 w-full rounded-xl md:h-40 md:min-h-max md:w-40" />
      <Skeleton className="bg-muted mt-2 h-6 w-16" />
    </div>
  )
}

export function CompetitionSkeleton() {
  return (
    <div className="bg-background/25 border-border flex flex-col rounded-xl border p-2 backdrop-blur-xs md:p-4">
      <div className="border-border mb-2 flex items-center gap-2 border-b pb-2">
        <Skeleton className="bg-muted h-10 w-10 rounded-full" />
        <Skeleton className="bg-muted h-6 w-32" />
      </div>
      <div className="flex flex-col gap-2 xl:flex-row">
        <PrizeSkeleton />
        <PrizeSkeleton />
        <PrizeSkeleton />
      </div>
    </div>
  )
}
