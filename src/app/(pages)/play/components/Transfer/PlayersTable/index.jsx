'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { selectPlayers } from 'app/lib/features/player/player.selector'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'
import TransferTableHead from './Head'
import TransferTableBody from './Body'
import TeamOverview from '../TeamOverview'
import TransferTableFilters from './Filters'
import PlayersTableSkeleton from './Skeleton'
import TanStackPagination from 'components/Table/TanStackPagination'
import { cn } from '@/lib/utils'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const columnHelper = createColumnHelper()

function PlayersTable() {
  const [sorting, setSorting] = useState([
    {
      id: 'price',
      desc: true,
    },
  ])
  const { t } = useTranslation()
  const { lang } = useSelector((state) => state.systemLanguage)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const { isLoading } = useSelector((state) => state.player)
  const players = useSelector(selectPlayers)
  const [windowWidth, setWindowWidth] = useState(0)
  const [data, setData] = useState(players || [])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const columns = [
    columnHelper.accessor('name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name, ru: row?.name_ru }),
      id: 'name',
      header: t('Ism'),
      meta: {
        filterVariant: 'name',
      },
    }),
    columnHelper.accessor('club.name', {
      id: 'club',
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.club?.name, ru: row?.club?.name_ru }),
      header: t('Klub'),
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
      accessorFn: (row) => row.position,
      id: 'position',
      header: t('Poz'),
      cell: (info) => <>{getCorrentPlayerPosition(info.getValue(), lang)}</>,
      meta: {
        filterVariant: 'position',
      },
    }),
  ]

  const table = useReactTable({
    columns,
    data,
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
  })

  useEffect(() => {
    if (lang) {
      setData([...players])
    }
  }, [lang, players])

  useEffect(() => {
    if (windowWidth >= 1024 && windowWidth <= 1280) {
      table.setPageSize(9)
    } else {
      table.setPageSize(10)
    }
  }, [windowWidth, table])

  if (isLoading) {
    return <PlayersTableSkeleton />
  }

  return (
    <section
      className={cn(
        'mx-auto flex w-full max-w-lg border-collapse flex-col gap-0 bg-black',
        'overflow-x-auto rounded-xl border border-primary border-opacity-50',
        'text-neutral-200 shadow-md shadow-neutral-600 transition-all',
        'p-2 xs:p-3 md:text-sm lg:w-1/2 lg:max-w-md xl:max-w-lg xl:p-4',
        'fade-in-fast hover:border-opacity-100 2xl:max-w-[36rem]'
      )}
    >
      <TeamOverview />
      <div className="grid w-full grid-cols-4 grid-rows-2 gap-x-1 gap-y-2 text-sm xs:text-xs sm:grid-rows-1 lg:grid-rows-2 lg:gap-y-1 xl:grid-rows-1 xl:gap-y-2 2xl:text-sm">
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <TransferTableFilters key={header.id} column={header.column} />
            ))
          )}
      </div>
      <table className="w-full min-w-80 table-auto text-xs xl:text-sm">
        <TransferTableHead table={table} />
        <TransferTableBody table={table} flexRender={flexRender} />
      </table>
      <TanStackPagination
        table={table}
        active="bg-primary text-black"
        className={'mt-auto px-0 pb-0 pt-1'}
      />
    </section>
  )
}

export default memo(PlayersTable)
