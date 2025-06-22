import ProfilePlayersStructure from './PlayersStructure'
import dynamic from 'next/dynamic'
import { GameBriefContainerSkeleton } from 'app/[locale]/play/[league]/[id]/(with-tour)/components/GameProfile/GameBrief/Skeleton'
const GameBrief = dynamic(() => import('./GameBrief'), {
  ssr: false,
  loading: () => <GameBriefContainerSkeleton />,
})
import LeftSideBanner from 'components/Banners/LeftSide'
import RightSideBanner from 'components/Banners/RightSide'
import StadiumContainer from 'components/StadiumContainer'
import GameWrapper from 'shared/GameWrapper'
import StadiumSectionWrapper from 'shared/StadiumSectionWrapper'

const TeamProfile = () => {
  return (
    <GameWrapper>
      <LeftSideBanner />
      <StadiumSectionWrapper>
        <StadiumContainer hideShareButton>
          <ProfilePlayersStructure />
        </StadiumContainer>
      </StadiumSectionWrapper>
      <GameBrief />
      <RightSideBanner />
    </GameWrapper>
  )
}

export default TeamProfile
