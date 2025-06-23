'use client'
import { flexRender } from '@tanstack/react-table'
import { ChevronsUpDown, ChevronsDown, ChevronsUp } from 'lucide-react'

const TableHead = ({ table }) => {
    return (
        <thead>
            {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <th
                                key={header.id}
                                colSpan={header.colSpan}
                                {...{
                                    className: header.column.getCanSort()
                                        ? 'cursor-pointer text-center select-none px-0.5 py-1 text-xs xs:text-sm lg:text-base font-medium md:p-1 md:text-start min-w-6 sm:min-w-max'
                                        : ' px-0.5 md:p-1 text-start ',
                                    onClick: header.column.getToggleSortingHandler(),
                                }}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                                {{
                                    asc: (
                                        <ChevronsDown
                                            className="hidden text-primary size-4 sm:inline-block"
                                        />
                                    ),
                                    desc: (
                                        <ChevronsUp
                                            className="hidden text-primary size-4 sm:inline-block"
                                        />
                                    ),
                                }[header.column.getIsSorted()] ?? (
                                        (header.column.getCanSort() && (
                                            <ChevronsUpDown className="hidden size-4 sm:inline-block" />
                                        ))
                                    )}
                            </th>
                        )
                    })}
                </tr>
            ))}
        </thead>
    )
}

export default TableHead
