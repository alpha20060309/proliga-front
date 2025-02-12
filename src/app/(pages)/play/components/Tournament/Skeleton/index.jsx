import { Skeleton } from '@/components/ui/skeleton'
import TopTeams from '../../TopTeams'
import { PaginationSkeleton } from 'components/Table/Pagination'

const TournamentSkeleton = ({ paginationCount, rows, cols }) => {
  return (
    <section className="flex w-full flex-col gap-2 lg:flex-row">
      <div className="flex h-full min-h-[40rem] w-full flex-1 table-auto flex-col overflow-x-auto rounded-xl bg-black px-2 py-4 text-neutral-200 xs:px-3 md:p-5 lg:w-2/3">
        <TournamentTableSkeleton
          rows={rows}
          cols={cols}
          paginationCount={paginationCount}
        />
        <TopTeams />
      </div>
    </section>
  )
}

export const TournamentTableSkeleton = ({
  rows = 14,
  cols = 5,
  paginationCount,
}) => {
  return (
    <>
      <table className="h-auto w-full min-w-72 table-auto text-xs sm:text-sm">
        <thead>
          <tr>
            {[...Array(cols)].map((_, index) => (
              <th
                key={index}
                className="p-0.5 text-center sm:min-w-16 md:p-1 md:text-start"
              >
                <Skeleton className="h-6 w-full" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr
              key={rowIndex}
              className="mx-auto border-b border-neutral-700 bg-neutral-900 text-center odd:bg-stone-950 hover:bg-neutral-800 md:text-start"
            >
              {[...Array(cols)].map((_, cellIndex) => (
                <td
                  key={cellIndex}
                  className="h-8 w-min px-0.5 capitalize md:w-auto"
                >
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationSkeleton
        count={paginationCount}
        className={'h-full items-end'}
      />
    </>
  )
}

export default TournamentSkeleton
