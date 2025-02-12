'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Head from './Head'
import Body from './Body'
import { useSelector } from 'react-redux'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { selectAllTeams } from 'app/lib/features/team/team.selector'

const columnHelper = createColumnHelper()

function TournamentTable({ showUserTourTeam }) {
  const { t } = useTranslation()
  const allTeams = useSelector(selectAllTeams)

  const columns = [
    columnHelper.accessor('', {
      accessorFn: (row) => row?.team?.order ?? '',
      header: t("O'RIN").toLocaleLowerCase(),
      id: 'Id',
    }),
    columnHelper.accessor('name', {
      accessorFn: (row) => row?.team?.name ?? '',
      cell: (info) => info.getValue(),
      header: t('Jamoa'),
    }),
    columnHelper.accessor('user', {
      accessorFn: (row) => row?.user_id?.name ?? '',
      header: t('Foydalanuvchi'),
    }),
    columnHelper.accessor('point', {
      accessorFn: (row) => row?.point,
      id: 'point',
      cell: (info) => info.getValue(),
      header: t('Tur'),
    }),
    columnHelper.accessor('team-point', {
      accessorFn: (row) => row?.team?.point,
      id: 'hammasi',
      header: t('Hammasi'),
    }),
  ]

  const table = useReactTable({
    columns,
    data: allTeams ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <table className="h-auto w-full min-w-72 table-auto text-xs sm:text-sm">
      <Head table={table} />
      <Body
        table={table}
        flexRender={flexRender}
        showUserTourTeam={showUserTourTeam}
      />
    </table>
  )
}

export default TournamentTable
