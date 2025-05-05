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
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'

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

            <Button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Fantasy Football',
                    url: window.location.href,
                  })
                }
              }}
              variant="default"
              size="default"
              className={cn(
                'absolute right-20 top-1 z-30 border bg-green-600',
                'shadow transition-colors'
              )}
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
            </Button>
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
