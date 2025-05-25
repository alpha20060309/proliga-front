'use client'

import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setBalanceModal } from 'app/lib/features/currentTeam/currentTeam.slice'
import { CONFIG_KEY } from 'app/utils/config.util'
import { useTranslation } from 'react-i18next'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { cn } from '@/lib/utils'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'
import { Plus, Check, X } from 'lucide-react'

const AddPlayerButton = ({
  cell,
  handleAddPlayer,
  teamBalance,
  teamConcat,
  totalPlayersCount,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const condition = teamBalance >= cell.row.original.price
  const isPlayerInTeam = teamConcat.find(
    (p) => p.player_id == +cell?.row?.original?.id
  )
  const currentTeam = useSelector(selectCurrentTeam)
  const config = useSelector(selectSystemConfig)

  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'
  const max_balance = +config[CONFIG_KEY.max_balance]?.value

  const handleClick = () => {
    if (condition) {
      handleAddPlayer(cell.row.original)
    } else {
      if (currentTeam?.balance === max_balance) {
        toast.info(t('Max balance has been reached!'))
      } else {
        toast.info(t('Not enough balance.'))
        transfer_show_modals && dispatch(setBalanceModal(true))
      }
    }
  }

  if (isPlayerInTeam) {
    return (
      <td
        className="fade-in-fast xs:p-1 flex h-full w-full cursor-pointer items-center justify-center p-0.5 md:w-auto"
        key={cell.column.id}
      >
        <Check className="size-5 text-green-500 select-none sm:size-6" />
      </td>
    )
  } else if (!isPlayerInTeam && totalPlayersCount < 11) {
    return (
      <td
        className="fade-in-fast xs:p-1 flex h-full w-full cursor-pointer items-center justify-center p-0.5 md:w-auto"
        key={cell.column.id}
        onClick={handleClick}
      >
        <Plus
          className={cn(
            'bg-foreground size-5 rounded p-1 shadow-sm select-none sm:size-6 dark:bg-transparent',
            condition ? 'text-primary' : 'text-muted-foreground'
          )}
        />
      </td>
    )
  } else if (!isPlayerInTeam && totalPlayersCount >= 11) {
    return (
      <td
        className="fade-in-fast xs:p-1 flex h-full w-full cursor-pointer items-center justify-center p-0.5 md:w-auto"
        key={cell.column.id}
      >
        <X className="text-muted-foreground size-5 select-none sm:size-6" />
      </td>
    )
  }
}

export default AddPlayerButton
