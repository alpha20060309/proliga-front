import Player from './Player'
import StadiumSpinner from '../../StadiumSpinner'
import { useSelector } from 'react-redux'
import {
  selectDEF,
  selectGOA,
  selectMID,
  selectSTR,
} from 'app/lib/features/teamPlayer/teamPlayer.selector'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { PlayersStructureContainer, MIDContainer, DEFContainer, STRContainer, GOAContainer } from 'shared/PlayersStructure'

const TransferPlayersStructure = () => {
  const currentTour = useSelector(selectCurrentTour)

  const { isLoading } = useSelector((state) => state.teamPlayer)
  const GOA = useSelector(selectGOA)
  const DEF = useSelector(selectDEF)
  const MID = useSelector(selectMID)
  const STR = useSelector(selectSTR)

  if (currentTour?.status !== TOUR_STATUS.notStartedTransfer) {
    return null
  }

  return (
    <PlayersStructureContainer>
      {isLoading ? (
        <StadiumSpinner />
      ) : (
        <>
          <GOAContainer>
            {GOA.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </GOAContainer>
          <DEFContainer>
            {DEF.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </DEFContainer>
          <MIDContainer>
            {MID.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </MIDContainer>
          <STRContainer>
            {STR.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </STRContainer>
        </>
      )}
    </PlayersStructureContainer>
  )
}

export default TransferPlayersStructure
