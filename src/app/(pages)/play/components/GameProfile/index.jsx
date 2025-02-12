import Image from 'next/image'
import dynamic from 'next/dynamic'
import ProfileStadiumForm from './ProfileStadiumForm'
import ProfilePlayersStructure from './PlayersStructure'
import { useSelector } from 'react-redux'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { GameBriefContainerSkeleton } from './GameBrief/Skeleton'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
const GameBrief = dynamic(() => import('./GameBrief'), {
  ssr: false,
  loading: () => <GameBriefContainerSkeleton />,
})
import PlayerInfo from 'components/Modals/PlayerInfo'
import { memo } from 'react'

const GameProfile = () => {
  const currentTour = useSelector(selectCurrentTour)

  return (
    <main className="flex w-full flex-col justify-between gap-2 lg:flex-row">
      <div className="mt-0.5 h-auto w-full flex-grow lg:w-1/2 xl:flex-grow-0">
        <div className="relative h-auto w-full">
          <Image
            src="/icons/stadium.svg"
            alt="stadium"
            width={700}
            height={600}
            className="w-full rounded-sm"
            priority
          />
          <ProfilePlayersStructure />
        </div>
        {currentTour?.status === TOUR_STATUS.notStartedTransfer && (
          <ProfileStadiumForm />
        )}
      </div>
      <GameBrief />
      <PlayerInfo />
    </main>
  )
}

export default memo(GameProfile)
