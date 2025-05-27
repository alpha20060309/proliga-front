import dynamic from 'next/dynamic'
import ProfileStadiumForm from './ProfileStadiumForm'
import ProfilePlayersStructure from './PlayersStructure'
import { GameBriefContainerSkeleton } from './GameBrief/Skeleton'
const GameBrief = dynamic(() => import('./GameBrief'), {
  ssr: false,
  loading: () => <GameBriefContainerSkeleton />,
})
import PlayerInfo from 'components/Modals/PlayerInfo'
import { memo } from 'react'
import StadiumContainer from 'components/StadiumContainer'

const GameProfile = () => {
  return (
    <main className="flex w-full flex-col justify-between gap-2 lg:flex-row">
      <div className="mt-0.5 h-auto w-full grow lg:w-1/2 xl:grow-0">
        <StadiumContainer>
          <ProfilePlayersStructure />
        </StadiumContainer>
        <ProfileStadiumForm />
      </div>
      <GameBrief />
      <PlayerInfo />
    </main>
  )
}

export default memo(GameProfile)
