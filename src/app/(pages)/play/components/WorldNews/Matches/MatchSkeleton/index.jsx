import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const MatchSkeleton = () => {
  return (
    <Card className="h-12 overflow-hidden">
      <CardContent className="flex h-12 items-center gap-1 px-1 py-2.5 xs:px-2 xs:py-3">
        <div className="flex w-full items-center gap-1 xs:gap-2">
          <Skeleton className="size-7 rounded-full xs:size-8" />
          <Skeleton className="h-4 w-16 xs:h-5 md:w-24" />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-0 rounded-sm md:w-40">
          <Skeleton className="h-7 w-16 md:w-20" />
        </div>
        <div className="flex w-full items-center justify-end gap-1 xs:gap-2">
          <Skeleton className="h-4 w-16 xs:h-5 md:w-24" />
          <Skeleton className="size-7 rounded-full xs:size-8" />
        </div>
      </CardContent>
    </Card>
  )
}

export default MatchSkeleton
