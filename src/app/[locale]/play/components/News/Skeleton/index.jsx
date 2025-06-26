import { Skeleton } from '@/components/ui/skeleton'
import { CalendarDays, Eye } from 'lucide-react'
import { PaginationSkeleton } from 'components/Table/Pagination/Server'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'

function ArticleSkeleton() {
  return (
    <div className="group bg-card flex h-[100px] w-auto overflow-hidden rounded-sm">
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
              <CalendarDays className="text-muted-foreground size-4 animate-pulse" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="text-muted-foreground size-4 animate-pulse" />
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
    <Card
      className={cn(
        'relative mx-auto lg:mx-0 flex h-172 w-full max-w-lg border-border lg:min-w-72 lg:flex-1 gap-4'
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="size-9 rounded-md" />
      </CardHeader>
      <CardContent className="flex h-full w-full flex-1 flex-col gap-2">
        {[...Array(count)].map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </CardContent>
      <CardFooter>
        <PaginationSkeleton count={paginationCount} className="w-full" />
      </CardFooter>
    </Card>
  )
}
