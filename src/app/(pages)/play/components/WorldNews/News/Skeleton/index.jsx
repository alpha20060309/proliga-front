import { Skeleton } from '@/components/ui/skeleton'
import { CalendarDays, Eye } from 'lucide-react'
import { PaginationSkeleton } from 'components/Table/Pagination'
import { cn } from '@/lib/utils'

function ArticleSkeleton() {
  return (
    <div className="group flex h-[100px] w-auto overflow-hidden rounded bg-neutral-800">
      <Skeleton className="aspect-video h-full w-36" />
      <div className="flex h-full w-full flex-col justify-between space-y-1 px-2 py-1">
        <div className="space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              <CalendarDays className="size-4 animate-pulse text-neutral-500" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="size-4 animate-pulse text-neutral-500" />
              <Skeleton className="h-4 w-10" />
            </div>
          </div>
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  )
}

export function NewsSkeleton({ count = 5, paginationCount = 5 }) {
  return (
    <div
      className={cn(
        'relative mx-auto flex h-min min-h-[42rem] w-full max-w-lg flex-col',
        'items-stretch justify-between rounded-xl bg-neutral-950 p-4 md:p-6 lg:mx-0',
        'gap-2 border border-neutral-600 lg:w-auto lg:min-w-72 lg:flex-1'
      )}
    >
      <Skeleton className="h-8 w-32 self-start" />
      <div className="flex h-full w-full flex-1 flex-col gap-2">
        {[...Array(count)].map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
      <PaginationSkeleton count={paginationCount} />
    </div>
  )
}
