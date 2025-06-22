import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

const PlayersTableSkeleton = () => {
  return (
    <Card
      className={
        'border-border mx-auto w-full max-w-2xl gap-2 py-4 lg:w-[55%] xl:gap-0 2xl:gap-2'
      }
    >
      <TeamOverviewSkeleton />
      <CardContent className="space-y-2 px-4">
        <TransferTableFiltersSkeleton />
        <table className="w-full min-w-80 table-auto text-xs xl:text-sm">
          <TransferTableHeadSkeleton />
          <TransferTableBodySkeleton />
        </table>
      </CardContent>
      <CardFooter>
        <TransferTablePaginationSkeleton />
      </CardFooter>
    </Card>
  )
}

const TeamOverviewSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col gap-2 px-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

const TransferTableBodySkeleton = () => {
  return (
    <tbody>
      {[...Array(10)].map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-border odd:bg-secondary w-full border-b"
        >
          {[...Array(5)].map((_, cellIndex) => (
            <td key={cellIndex} className="p-1">
              <Skeleton className="h-4 w-full min-w-8 2xl:min-w-10" />
            </td>
          ))}
          <td className="p-2">
            <Skeleton className="h-6 w-6 rounded-full" />
          </td>
        </tr>
      ))}
    </tbody>
  )
}

const TransferTableFiltersSkeleton = () => {
  return (
    <div className="xs:text-xs grid w-full grid-cols-4 grid-rows-2 gap-x-1 gap-y-2 text-sm sm:grid-rows-1 lg:grid-rows-2 lg:gap-y-1 xl:grid-rows-1 xl:gap-y-2 2xl:text-sm">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  )
}

const TransferTableHeadSkeleton = () => {
  return (
    <thead>
      <tr>
        {[...Array(5)].map((_, index) => (
          <th key={index} className="p-2">
            <Skeleton className="h-6 w-full" />
          </th>
        ))}
      </tr>
    </thead>
  )
}

const TransferTablePaginationSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 overflow-x-auto">
      {[...Array(7)].map((_, index) => (
        <Skeleton key={index} className="h-8 w-8 rounded-sm" />
      ))}
    </div>
  )
}

export default PlayersTableSkeleton
