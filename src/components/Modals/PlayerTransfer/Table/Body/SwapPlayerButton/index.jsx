import { useDispatch, useSelector } from 'react-redux'
import { setBalanceModal } from 'app/lib/features/currentTeam/currentTeam.slice'
import { setPlayerTransferModal } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { CONFIG_KEY } from 'app/utils/config.util'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { selectTeamConcat } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentPlayer } from 'app/lib/features/player/player.selector'
import { cn } from '@/lib/utils'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { ArrowUpDown, Check } from 'lucide-react'

const SwapPlayerButton = ({ cell, handleSwapPlayer, teamBalance }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const teamConcat = useSelector(selectTeamConcat)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const config = useSelector(selectSystemConfig)

  const max_balance = +config[CONFIG_KEY.max_balance]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'

  const condition = teamBalance + currentPlayer.price >= cell.row.original.price

  const toggleModal = () => {
    dispatch(setPlayerTransferModal(false))
  }

  const handleClick = () => {
    if (condition) {
      handleSwapPlayer(cell.row.original)
    } else {
      if (currentTeam?.balance === max_balance) {
        toggleModal()
        toast.info(t('Max balance has been reached!'))
      } else {
        toast.info(t('Not enough balance.'))
        toggleModal()
        transfer_show_modals && dispatch(setBalanceModal(true))
      }
    }
  }

  const isPlayerInTeam = teamConcat.find(
    (p) => p.player_id == +cell?.row?.original?.id
  )

  if (isPlayerInTeam) {
    return (
      <td
        className="fade-in-fast flex h-full w-full cursor-pointer items-center justify-center p-1 md:w-auto"
        key={cell.column.id}
      >
        <Check className="border-foreground text-foreground dark:bg-background size-5 rounded border bg-green-500 p-1 shadow-sm select-none sm:size-6 dark:border-green-500 dark:text-green-500" />
      </td>
    )
  } else {
    return (
      <td
        className="fade-in-fast flex size-4 h-full w-full cursor-pointer items-center justify-center p-1 md:w-auto"
        key={cell.column.id}
        onClick={handleClick}
      >
        <ArrowUpDown
          className={cn(
            'size-5 rounded border p-1 shadow-sm select-none sm:size-6',
            condition
              ? 'bg-primary text-primary-foreground border-foreground dark:text-primary dark:bg-background dark:border-primary'
              : 'text-muted-foreground border-muted-foreground'
          )}
        />
      </td>
    )
  }
}

export default SwapPlayerButton
