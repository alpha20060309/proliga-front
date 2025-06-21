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
import { getCorrectName } from 'app/utils/getCorrectName.util'
import AddPlayerButton from './AddPlayerButton'
import { useDispatch } from 'react-redux'
import {
  addTeamPlayer,
  updateTeamPlayer,
} from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { CONFIG_KEY } from 'app/utils/config.util'
import {
  selectTotalPlayersCount,
  selectTeamConcat,
} from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

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
  const dispatch = useDispatch()
  const totalPlayersCount = useSelector(selectTotalPlayersCount)
  const teamConcat = useSelector(selectTeamConcat)
  const currentTeam = useSelector(selectCurrentTeam)
  const config = useSelector(selectSystemConfig)
  const { teamPrice } = useSelector((store) => store.teamPlayer)
  const max_same_team_players = +config[CONFIG_KEY.max_same_team_players]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'

  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  const handleAddPlayer = (player) => {
    if (currentTeam?.is_team_created) {
      dispatch(
        addTeamPlayer({
          player,
          team: currentTeam,
          teamConcat,
          t,
          max_same_team_players,
          transfer_show_modals,
        })
      )
    } else {
      dispatch(
        updateTeamPlayer({
          player,
          team: currentTeam,
          teamConcat,
          t,
          max_same_team_players,
          transfer_show_modals,
        })
      )
    }
  }

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
    columnHelper.display({
      id: 'action',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const rowId = row.original.id
        const rowData = row.original
        return (
          <AddPlayerButton
            teamBalance={teamBalance}
            key={rowId}
            player={rowData}
            teamConcat={teamConcat}
            handleAddPlayer={handleAddPlayer}
            totalPlayersCount={totalPlayersCount}
          />
        )
      },
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
  })

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
    <Card
      className={
        'border-border mx-auto w-full max-w-lg gap-2 py-4 lg:w-1/2 lg:max-w-md 2xl:max-w-xl'
      }
    >
      <TeamOverview />
      <CardContent className="space-y-2 px-4">
        <div className="xs:text-xs grid w-full grid-cols-4 grid-rows-2 gap-x-1 gap-y-2 text-sm sm:grid-rows-1 lg:grid-rows-2 lg:gap-y-1 xl:grid-rows-1 xl:gap-y-2 2xl:text-sm">
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
      </CardContent>
      <CardFooter>
        <TanStackPagination
          table={table}
          active="bg-primary text-primary-foreground"
          className={'w-full'}
        />
      </CardFooter>
    </Card>
  )
}

export default memo(PlayersTable)
