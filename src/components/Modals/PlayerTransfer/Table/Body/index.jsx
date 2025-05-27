import SwapPlayerButton from './SwapPlayerButton'
import { useDispatch, useSelector } from 'react-redux'
import { swapTeamPlayer } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEY } from 'app/utils/config.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { cn } from '@/lib/utils'
import { selectCurrentPlayer } from 'app/lib/features/player/player.selector'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

const TransferTableBody = ({ table, flexRender }) => {
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const { teamPrice } = useSelector((store) => store.teamPlayer)
  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)
  const config = useSelector(selectSystemConfig)
  const { t } = useTranslation()

  const max_same_team_players = +config[CONFIG_KEY.max_same_team_players]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'

  const handleSwapPlayer = (player) => {
    dispatch(
      swapTeamPlayer({
        player,
        previousPlayer: currentPlayer,
        team: currentTeam,
        t,
        transfer_show_modals,
        max_same_team_players,
      })
    )
  }

  return (
    <tbody>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="border-muted-foreground bg-background odd:bg-muted hover:bg-background mx-auto border-b"
        >
          {row.getVisibleCells().map((cell) => (
            <td
              className={cn(
                'text-3xs xs:text-xs px-0 text-center capitalize sm:text-start sm:text-sm md:p-1 lg:text-base',
                cell.column.id === 'name' ? 'min-w-1/4' : 'w-min sm:w-auto'
              )}
              key={cell.id}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
          {row
            .getVisibleCells()
            .map(
              (cell) =>
                cell.column.id === 'name' && (
                  <SwapPlayerButton
                    teamBalance={teamBalance}
                    key={cell.id}
                    cell={cell}
                    handleSwapPlayer={handleSwapPlayer}
                  />
                )
            )}
        </tr>
      ))}
    </tbody>
  )
}

export default TransferTableBody
