'use client'

import { useTranslation } from 'react-i18next'
import PlayerTable from './Table'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from '@/components/ui/dialog'

const PlayerTransferModal = ({ prevPlayer, isModalOpen, setModalOpen }) => {
  const { t } = useTranslation()

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="mx-auto flex max-h-[90vh] min-h-[50vh] w-full max-w-3xl flex-col gap-4 overflow-y-auto rounded-xl bg-black px-4 py-6 text-neutral-200 md:p-6 xl:max-h-[45rem]"
      >
        <DialogTitle>{t('Transfer Amalga Oshirish')}</DialogTitle>
        <PlayerTable prevPlayer={prevPlayer} />
        <DialogDescription className="hidden">
          This is a players transfer table
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default PlayerTransferModal
