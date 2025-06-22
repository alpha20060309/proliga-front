import ProfilePlayersStructure from './PlayersStructure'
import GameBrief from './GameBrief'
import LeftSideBanner from 'components/Banners/LeftSide'
import RightSideBanner from 'components/Banners/RightSide'
import StadiumContainer from 'shared/StadiumContainer'
import { GameWrapper, StadiumSectionWrapper } from 'shared/GameWrapper'

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
