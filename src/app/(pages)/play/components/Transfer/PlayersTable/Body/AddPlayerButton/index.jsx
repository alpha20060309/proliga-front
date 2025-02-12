'use client'

import Image from 'next/image'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setBalanceModal } from 'app/lib/features/currentTeam/currentTeam.slice'
import { CONFIG_KEY } from 'app/utils/config.util'
import { useTranslation } from 'react-i18next'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { cn } from '@/lib/utils'
import { selectSystemConfig } from 'app/lib/features/systemConfig/systemConfig.selector'

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
        toast.info(t('Max balance has been reached!'), { theme: 'dark' })
      } else {
        toast.info(t('Not enough balance.'), { theme: 'dark' })
        transfer_show_modals && dispatch(setBalanceModal(true))
      }
    }
  }

  if (isPlayerInTeam) {
    return (
      <td
        className="fade-in-fast flex h-full w-full cursor-pointer items-center justify-center p-0.5 xs:p-1 md:w-auto"
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
  } else if (!isPlayerInTeam && totalPlayersCount < 11) {
    return (
      <td
        className="fade-in-fast flex h-full w-full cursor-pointer items-center justify-center p-0.5 xs:p-1 md:w-auto"
        key={cell.column.id}
        onClick={handleClick}
      >
        <Image
          src="/icons/plus.svg"
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
  } else if (!isPlayerInTeam && totalPlayersCount >= 11) {
    return (
      <td
        className="fade-in-fast flex h-full w-full cursor-pointer items-center justify-center p-0.5 xs:p-1 md:w-auto"
        key={cell.column.id}
      >
        <Image
          src="/icons/close-circle.svg"
          alt="plus"
          width={24}
          draggable={false}
          className="filter-neutral-400 size-5 h-full select-none opacity-80 sm:size-6"
          height={24}
        />
      </td>
    )
  }
}

export default AddPlayerButton
