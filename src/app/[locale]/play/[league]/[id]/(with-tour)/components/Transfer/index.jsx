import PlayersStructure from './PlayersStructure'
import PlayersTable from './PlayersTable'
import TransferStadiumForm from './TransferStadiumForm'
import PlayerTransfer from 'components/Modals/PlayerTransfer'
import StadiumContainer from 'shared/StadiumContainer'
import { memo } from 'react'
import { GameWrapper, StadiumSectionWrapper } from 'shared/GameWrapper'

const Transfer = () => {
  return (
    <>
      <GameWrapper>
        <StadiumSectionWrapper>
          <StadiumContainer hideShareButton>
            <PlayersStructure />
          </StadiumContainer>
          <TransferStadiumForm />
        </StadiumSectionWrapper>
        <PlayersTable />
      </GameWrapper>
      <PlayerTransfer />
    </>
  )
}

export default memo(Transfer)
