'use client'

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
import StadiumContainer from 'shared/StadiumContainer'
import GameWrapper from 'shared/GameWrapper'
import StadiumSectionWrapper from 'shared/StadiumSectionWrapper'

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
