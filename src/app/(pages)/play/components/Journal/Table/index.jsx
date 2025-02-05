'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import TransferTableHead from './Head'
import TransferTableBody from './Body'
import { useSelector } from 'react-redux'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { formatDate } from 'app/utils/formatDate.util'
import { selectUserActivities } from 'app/lib/features/userActivity/userActivity.selector'

const columnHelper = createColumnHelper()

function JournalTable() {
  const { t } = useTranslation()
  const activities = useSelector(selectUserActivities)
  const { lang } = useSelector((state) => state.systemLanguage)

  const columns = [
    columnHelper.accessor('created_at', {
      id: 'date',
      header: t('Sana'),
      accessorFn: (row) => formatDate(row.created_at),
    }),
    columnHelper.accessor('name', {
      accessorKey: 'name',
      cell: (info) => info.getValue(),
      header: t('Oyinchi ismi'),
      id: 'name',
      header: t('Xabar'),
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name_uz, ru: row?.name_ru }),
    }),
  ]

  const table = useReactTable({
    columns,
    data: activities || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <table className="h-auto w-full text-xs md:text-sm">
      <TransferTableHead table={table} />
      <TransferTableBody table={table} flexRender={flexRender} />
    </table>
  )
}

export default JournalTable
