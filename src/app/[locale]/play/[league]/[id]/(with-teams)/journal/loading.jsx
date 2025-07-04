import { Skeleton } from 'components/ui/skeleton'
import { PaginationSkeleton } from 'components/Table/Pagination/Server'

function TableSkeleton({ rows = 13 }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 md:gap-4">
        <div className="w-1/4">
          <Skeleton className="h-6 max-w-16 md:max-w-24" />
        </div>
        <div className="w-3/4">
          <Skeleton className="h-6 max-w-36 md:max-w-56" />
        </div>
      </div>
      <div className="space-y-2">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex h-8 gap-2 md:gap-4">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function JournalSkeleton({ rows, paginationCount }) {
  return (
    <>
      <TableSkeleton rows={rows} />
      <PaginationSkeleton
        count={paginationCount}
        className={'h-full items-end'}
      />
    </>
  )
}

export default function Loading() {
  return <JournalSkeleton rows={10} paginationCount={13} />
}
