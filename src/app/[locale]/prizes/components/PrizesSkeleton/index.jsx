'use client'
import { Skeleton } from '@/components/ui/skeleton'

export function PrizesSkeleton({ count = 4 }) {
  return (
    <>
      <Skeleton className="bg-muted mb-4 h-12 w-48" />
      <section className="flex w-full flex-col items-center justify-center gap-2">
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
      <Skeleton className="bg-muted h-full min-h-64 min-w-64 flex-1 rounded-xl lg:min-h-80 lg:min-w-80 xl:min-h-96 xl:min-w-96" />
      <Skeleton className="bg-muted mt-2 h-6 w-16" />
    </div>
  )
}

export function CompetitionSkeleton() {
  return (
    <article className="group bg-background/25 hover:bg-background/40 border-border hover:border-card flex w-full flex-1 flex-col rounded-xl border p-2 backdrop-blur-xs transition-all md:p-4">
      <div className="group-hover:border-primary border-border mb-2 flex items-center gap-2 border-b pb-2 transition-all">
        <Skeleton className="bg-muted h-10 w-10 rounded-full" />
        <Skeleton className="bg-muted h-6 w-32" />
      </div>
      <div className="flex flex-col gap-2 lg:flex-row">
        <PrizeSkeleton />
        <PrizeSkeleton />
        <PrizeSkeleton />
      </div>
    </article>
  )
}
