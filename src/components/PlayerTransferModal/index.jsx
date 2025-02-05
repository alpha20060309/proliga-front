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
        className="mx-auto flex max-h-[90vh] min-h-[50vh] w-[96%] max-w-[45rem] flex-col gap-4 overflow-y-auto rounded-xl bg-black px-4 py-6 text-neutral-200 xs:w-[92%] md:w-[80%] md:p-6 lg:w-3/4 xl:max-h-[45rem] xl:w-2/3"
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
