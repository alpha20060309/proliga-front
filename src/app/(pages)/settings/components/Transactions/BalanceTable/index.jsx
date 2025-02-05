'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { formatCurrency } from 'app/utils/formatCurrency'
import TransactionsTableHead from './Head'
import TransactionsTableBody from './Body'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import TanStackPagination from 'components/Table/TanStackPagination'
import { formatDate } from 'app/utils/formatDate.util'
import { selectBalances } from 'app/lib/features/payBalance/payBalance.selector'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PaymentOptionIcon } from '../PackagesTable'

const columnHelper = createColumnHelper()

function CabinetTransactionsBalanceTable() {
  const { t } = useTranslation()
  const balances = useSelector(selectBalances)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 9,
  })

  const columns = [
    columnHelper.accessor('Date', {
      accessorFn: (row) => formatDate(row?.created_at),
      id: 'date',
      cell: (info) => (
        <time className="tracking-tighter">{info.getValue()}</time>
      ),
      header: t('Sana'),
    }),
    columnHelper.accessor('Kod', {
      accessorFn: (row) => row?.transaction_id ?? '',
      id: 'code',
      cell: (info) => (
        <Popover>
          <PopoverTrigger className="cursor-pointer select-none text-sm font-bold text-primary md:text-base">
            ******
          </PopoverTrigger>
          <PopoverContent
            className="w-auto text-sm md:text-base"
            align="center"
          >
            {info.getValue()}
          </PopoverContent>
        </Popover>
      ),
      header: t('Code'),
    }),
    columnHelper.accessor('System', {
      accessorFn: (row) => row?.system,
      id: 'title',
      cell: (info) => <PaymentOptionIcon system={info.getValue()} />,
      header: t('System'),
    }),
    columnHelper.accessor('sum', {
      accessorFn: (row) => formatCurrency({ value: row?.price || 0, t }),
      id: 'sum',
      cell: (info) => <span className="text-green-500">{info.getValue()}</span>,
      header: t('Narx'),
    }),
  ]

  const table = useReactTable({
    columns,
    data: balances ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })
  return (
    <section className="flex h-full w-full flex-1 flex-col justify-between gap-1 overflow-x-auto">
      <table className="w-full table-fixed rounded text-[11px] xs:text-xs md:text-sm">
        <TransactionsTableHead table={table} />
        <TransactionsTableBody table={table} flexRender={flexRender} />
      </table>
      <TanStackPagination
        table={table}
        className={'mt-auto h-full flex-1 items-end self-center'}
      />
    </section>
  )
}

export default CabinetTransactionsBalanceTable
