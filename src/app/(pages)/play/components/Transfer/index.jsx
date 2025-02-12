'use client'

import Image from 'next/image'
import PlayersStructure from './PlayersStructure'
import PlayersTable from './PlayersTable'
import TransferStadiumForm from './TransferStadiumForm'
import { useSelector } from 'react-redux'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import PlayerTransfer from 'components/Modals/PlayerTransfer'
import { memo } from 'react'

const Transfer = () => {
  const currentTour = useSelector(selectCurrentTour)

  return (
    <>
      <main className="flex w-full flex-col justify-between gap-1 lg:flex-row">
        <div className="mt-0.5 flex h-auto flex-grow flex-col lg:w-1/2 xl:flex-grow-0">
          <div className="relative h-auto w-full lg:w-full">
            <Image
              src="/icons/stadium.svg"
              alt="stadium"
              width={700}
              height={600}
              draggable={false}
              priority
              className="w-full select-none rounded"
            />
            {currentTour?.status === TOUR_STATUS.notStartedTransfer && (
              <PlayersStructure />
            )}
          </div>
          <TransferStadiumForm />
        </div>
        <PlayersTable />
      </main>
      <PlayerTransfer />
    </>
  )
}

export default memo(Transfer)
