'use client'

import ProfileStadiumForm from './ProfileStadiumForm'
import ProfilePlayersStructure from './PlayersStructure'
import GameBrief from './GameBrief'
import PlayerInfo from 'components/Modals/PlayerInfo'
import { memo } from 'react'
import StadiumContainer from 'shared/StadiumContainer'
import { GameWrapper, StadiumSectionWrapper } from 'shared/GameWrapper'

const GameProfile = () => {
  return (
    <>
      <GameWrapper>
        <StadiumSectionWrapper>
          <StadiumContainer>
            <ProfilePlayersStructure />
          </StadiumContainer>
          <ProfileStadiumForm />
        </StadiumSectionWrapper>
        <GameBrief />
      </GameWrapper>
      <PlayerInfo />
    </>
  )
}

export default memo(GameProfile)
