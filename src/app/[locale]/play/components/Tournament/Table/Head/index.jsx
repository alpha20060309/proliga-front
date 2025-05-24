'use client'
import { flexRender } from '@tanstack/react-table'
import Image from 'next/image'

const TournamentTableHead = ({ table }) => {
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
                    ? 'cursor-pointer select-none capitalize p-0.5 md:p-1 text-center md:text-start sm:min-w-16 sm:min-w-max'
                    : ' px-0.5 md:p-1 text-center md:text-start capitalize',
                  onClick: header.column.getToggleSortingHandler(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {{
                  asc: (
                    <Image
                      src="/icons/arrow-active-top.svg"
                      alt="triangle arrow"
                      width={12}
                      height={12}
                      className="hidden size-4 rotate-180 sm:inline-block"
                    />
                  ),
                  desc: (
                    <Image
                      src="/icons/arrow-active-top.svg"
                      alt="triangle arrow"
                      width={12}
                      height={12}
                      className="hidden size-4 sm:inline-block"
                    />
                  ),
                }[header.column.getIsSorted()] ?? (
                  <Image
                    src="/icons/arrow-inactive.svg"
                    alt="triangle arrow"
                    width={12}
                    height={12}
                    className="hidden size-4 rotate-180 sm:inline-block"
                  />
                )}
              </th>
            )
          })}
        </tr>
      ))}
    </thead>
  )
}

export default TournamentTableHead
