'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { selectPlayers } from 'app/lib/features/player/player.selector'
import { getCorrentPlayerPosition } from 'app/utils/getCorrectPlayerPosition.utils'
import Head from './Head'
import Body from './Body'
import StatisticsTableFilters from '../Filters'
import TanStackPagination from 'components/Table/TanStackPagination'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const columnHelper = createColumnHelper()

function StatisticsTable() {
  const { t } = useTranslation()
  const players = useSelector(selectPlayers)
  const { lang } = useSelector((state) => state.systemLanguage)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  })
  const [data, setData] = useState(players || [])

  const columns = [
    columnHelper.accessor('player_id.position', {
      accessorFn: (row) => getCorrentPlayerPosition(row?.position, lang),
      id: 'player-position',
      header: t('POZ'),
      meta: {
        title: t('O‘yinchining pozitsiyasi'),
      },
    }),
    columnHelper.accessor('player_id.name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name, ru: row?.name_ru }),
      header: t("O'yinchi ismi"),
      id: 'player-name',
      meta: {
        title: t("O'yinchini toliq ismi"),
        filterVariant: 'name',
      },
    }),
    columnHelper.accessor('club_id.name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.club?.name, ru: row?.club?.name_ru }),
      header: t('Klub'),
      id: 'club',
      meta: {
        title: t('Clubni nomi'),
        filterVariant: 'club',
      },
    }),
    columnHelper.accessor('ochko', {
      accessorFn: (row) => row?.point,
      id: 'ochko',
      header: t('O'),
      meta: {
        title: t('Ochko'),
      },
    }),
    columnHelper.accessor((row) => row.goal, {
      accessorFn: (row) => row?.goal,
      id: 'gol',
      cell: (info) => info.getValue(),
      header: t('G') + ' ',
      meta: {
        title: t('Gol'),
      },
    }),
    columnHelper.accessor('GA', {
      accessorFn: (row) => row?.goal_asist,
      id: 'gol assist',
      header: t('GA'),
      meta: {
        title: t('Assist'),
      },
    }),
    columnHelper.accessor((row) => row?.missed_penalty, {
      accessorFn: (row) => row?.missed_penalty,
      id: 'returned penalty',
      header: t('QP'),
      meta: {
        title: t('Qaytarilgan penalti'),
      },
    }),
    columnHelper.accessor('yellow_card', {
      accessorFn: (row) => row?.yellow_card,
      id: 'Yellow Card',
      header: t('SK'),
      meta: {
        title: t('Sariq kartochka'),
      },
    }),
    columnHelper.accessor('red_card', {
      accessorFn: (row) => row?.red_card,
      id: 'Red Card',
      header: t('QZ'),
      meta: {
        title: t('Qizil kartochka'),
      },
    }),
    columnHelper.accessor((row) => row.played_min, {
      accessorFn: (row) => row?.played_min,
      id: 'played-min',
      header: t('MIN'),
      meta: {
        title: t('O‘ynagan vaqti'),
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
    state: {
      pagination,
    },
  })

  useEffect(() => {
    if (lang) {
      setData([...players])
    }
  }, [lang, players])

  return (
    <section className="flex h-full flex-col gap-2">
      <div className="flex-0 relative flex gap-1 text-xs xs:text-sm">
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <StatisticsTableFilters key={header.id} column={header.column} />
            ))
          )}
      </div>
      <div className="flex h-full flex-1 flex-col justify-between gap-2">
        <table className="min-w-[22rem] text-[11px] xs:text-xs md:text-sm">
          <Head table={table} />
          <Body table={table} flexRender={flexRender} />
        </table>
        <TanStackPagination
          table={table}
          active="bg-neutral-300 text-black "
          className={'mt-auto'}
        />
      </div>
    </section>
  )
}

export default StatisticsTable
