'use client'
import { Skeleton } from '@/components/ui/skeleton'

import TopTeams from '../components/TopTeams'
import { Table, TableBody, TableHead, TableRow, TableHeadCell } from '@/components/ui/table'


const StatisticsTableSkeleton = () => {
    return (
        <>
            <StatisticsTableFiltersSkeleton />
            <Table className="text-3xs xs:text-xs h-auto w-full min-w-80 md:text-sm">
                <StatisticsTableHeadSkeleton />
                <StatisticsTableBodySkeleton />
            </Table>
            {/* <StatisticsTablePaginationSkeleton /> */}
        </>
    )
}

const StatisticsTableBodySkeleton = () => {
    return (
        <TableBody>
            {[...Array(14)].map((_, rowIndex) => (
                <TableRow
                    key={rowIndex}
                    className="hover:bg-background border-border mx-auto w-full border-b"
                >
                    {[...Array(10)].map((_, cellIndex) => (
                        <td
                            key={cellIndex}
                            className="h-8 w-min px-0.5 py-1 text-center sm:min-w-8 md:text-start"
                        >
                            <Skeleton className="h-4 w-full" />
                        </td>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    )
}

const StatisticsTableHeadSkeleton = () => {
    return (
        <TableHead>
            <TableRow className="relative rounded-md">
                {[...Array(10)].map((_, index) => (
                    <TableHeadCell
                        key={index}
                        className="min-w-5 p-0.5 text-center md:p-1 md:text-start"
                    >
                        <Skeleton className="h-6 w-full" />
                    </TableHeadCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

const StatisticsTableFiltersSkeleton = () => {
    return (
        <div className="xs:text-sm relative flex flex-col gap-2 text-xs sm:flex-row">
            <Skeleton className="h-8 w-full sm:w-80" />
            <Skeleton className="h-8 w-full sm:w-40" />
        </div>
    )
}

// const StatisticsSkeleton = () => {
//     return (
//         <section className="flex w-full flex-col gap-2 lg:flex-row">
//             <div className="bg-background text-secondary-foreground xs:px-3 flex h-full min-h-160 w-full flex-1 table-auto flex-col gap-4 overflow-x-auto rounded-xl px-2 py-3 md:p-5 lg:w-2/3">
//                 <StatisticsTableSkeleton />
//             </div>
//             <TopTeams />
//         </section>
//     )
// }
// const StatisticsTablePaginationSkeleton = () => {
//     return (
//         <section className="mt-auto flex items-center justify-center gap-2 overflow-x-auto">
//             {[...Array(9)].map((_, index) => (
//                 <Skeleton key={index} className="h-7 w-7 rounded-sm md:h-8 md:w-8" />
//             ))}
//         </section>
//     )
// }

// export default StatisticsSkeleton
