'use client'

import { useTranslation } from 'react-i18next'
import PlayerTable from './Table'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from '@/components/ui/dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setPlayerTransferModal } from 'app/lib/features/teamPlayer/teamPlayer.slice'
import { selectCurrentPlayer } from 'app/lib/features/player/player.selector'
import { memo } from 'react'

const PlayerTransfer = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { transferModal } = useSelector((store) => store.teamPlayer)
  const currentPlayer = useSelector(selectCurrentPlayer)

  const setModalOpen = () => {
    dispatch(setPlayerTransferModal(false))
  }

  return (
    <Dialog
      open={transferModal && currentPlayer?.id}
      onOpenChange={setModalOpen}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="mx-auto flex max-h-[75vh] min-h-[33.5rem] w-[98%] max-w-3xl flex-col gap-4 overflow-y-auto rounded-xl bg-black px-4 py-6 text-neutral-200 md:p-6 xl:max-h-[45rem]"
      >
        <DialogTitle>{t('Transfer Amalga Oshirish')}</DialogTitle>
        <PlayerTable />
        <DialogDescription className="hidden">
          This is a players transfer table
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default memo(PlayerTransfer)
