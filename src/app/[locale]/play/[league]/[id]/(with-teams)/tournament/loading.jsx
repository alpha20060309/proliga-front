import { Skeleton } from '@/components/ui/skeleton'
import { PaginationSkeleton } from 'components/Table/Pagination/Server'

const TournamentTableSkeleton = ({
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
                            className="hover:bg-card border-border bg-background text-foreground odd:bg-secondary mx-auto border-b text-center md:text-start"
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

export default TournamentTableSkeleton
