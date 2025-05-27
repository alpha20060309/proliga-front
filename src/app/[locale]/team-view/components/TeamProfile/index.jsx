import ProfilePlayersStructure from './PlayersStructure'
import dynamic from 'next/dynamic'
import { GameBriefContainerSkeleton } from 'app/[locale]/play/components/GameProfile/GameBrief/Skeleton'
const GameBrief = dynamic(() => import('./GameBrief'), {
  ssr: false,
  loading: () => <GameBriefContainerSkeleton />,
})
import LeftSideBanner from 'components/Banners/LeftSide'
import RightSideBanner from 'components/Banners/RightSide'
import StadiumContainer from 'components/StadiumContainer'

const TeamProfile = () => {
  return (
    <main className="flex w-full flex-col justify-between gap-1.5 lg:flex-row">
      <LeftSideBanner />
      <div className="mt-0.5 h-full w-full lg:w-1/2">
        <StadiumContainer hideShareButton>
          <ProfilePlayersStructure />
        </StadiumContainer>
      </div>
      <GameBrief />
      <RightSideBanner />
    </main>
  )
}

export default TeamProfile
