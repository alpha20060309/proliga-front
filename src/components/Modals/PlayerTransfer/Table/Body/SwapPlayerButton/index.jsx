import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setBalanceModal } from 'app/lib/features/currentTeam/currentTeam.slice'
import { setPlayerTransferModal } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { CONFIG_KEY } from 'app/utils/config.util'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { selectTeamConcat } from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentPlayer } from 'app/lib/features/player/player.selector'
import { cn } from '@/lib/utils'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

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
        toast.info(t('Max balance has been reached!'), { theme: 'dark' })
      } else {
        toast.info(t('Not enough balance.'), { theme: 'dark' })
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
        <Image
          src="/icons/check.svg"
          alt="plus"
          width={24}
          draggable={false}
          height={24}
          className="filter-green-500 size-5 select-none sm:size-6"
        />
      </td>
    )
  } else {
    return (
      <td
        className="fade-in-fast flex size-4 h-full w-full cursor-pointer items-center justify-center p-1 md:w-auto"
        key={cell.column.id}
        onClick={handleClick}
      >
        <Image
          src="/icons/swap-circle.svg"
          alt="plus"
          width={24}
          draggable={false}
          className={cn(
            'size-5 select-none sm:size-6',
            condition ? 'filter-primary' : 'filter-neutral-400'
          )}
          height={24}
        />
      </td>
    )
  }
}

export default SwapPlayerButton
