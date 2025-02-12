'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCurrentPlayer,
  selectPlayers,
} from 'app/lib/features/player/player.selector'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import TransferTableHead from './Head'
import TransferTableBody from './Body'
import TransferTableFilters from './Filters'
import TanStackPagination from 'components/Table/TanStackPagination'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const columnHelper = createColumnHelper()

function PlayerTable() {
  const { t } = useTranslation()
  const { lang } = useSelector((state) => state.systemLanguage)
  const players = useSelector(selectPlayers)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState([
    {
      id: 'price',
      desc: true,
    },
  ])

  const columns = [
    columnHelper.accessor('name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name, ru: row?.name_ru }),
      header: t('Ism'),
      id: 'name',
      meta: {
        filterVariant: 'name',
      },
    }),
    columnHelper.accessor('club.name', {
      header: t('Klub'),
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.club?.name, ru: row?.club?.name_ru }),
      meta: {
        filterVariant: 'club',
      },
    }),
    columnHelper.accessor('price', {
      accessorKey: 'price',
      header: t('Narx'),
      cell: (info) => info.renderValue(),
      filterFn: (row, id, filterValues) => {
        const price = row.getValue(id)
        const { min, max } = filterValues

        if (min !== undefined && price < min) {
          return false
        }
        if (max !== undefined && price > max) {
          return false
        }
        return true
      },
      meta: {
        filterVariant: 'price',
      },
    }),
    columnHelper.accessor((row) => row.point, {
      accessorFn: (row) => row.point,
      id: 'point',
      cell: (info) => info.getValue(),
      header: t('Ochko'),
    }),
    columnHelper.accessor('position', {
      accessorFn: (row) => getCorrentPlayerPosition(row?.position, lang),
      id: 'position',
      header: t('Poz'),
    }),
  ]

  const table = useReactTable({
    columns,
    data: players || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
    initialState: {
      columnFilters: [
        {
          id: 'position',
          value: getCorrentPlayerPosition(currentPlayer?.position || '', lang),
        },
      ],
    },
  })

  return (
    <main className="flex flex-1 flex-col text-neutral-200 md:text-sm">
      <div className="grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-2 text-sm xs:text-xs sm:grid-cols-4 sm:grid-rows-1 md:gap-1 md:text-sm lg:text-base">
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <TransferTableFilters key={header.id} column={header.column} />
            ))
          )}
      </div>
      <table className="mt-2 w-full min-w-80 table-auto text-sm">
        <TransferTableHead table={table} />
        <TransferTableBody table={table} flexRender={flexRender} />
      </table>
      <TanStackPagination
        table={table}
        active="bg-primary text-black"
        className={'mt-auto pt-2'}
      />
    </main>
  )
}

export default PlayerTable
