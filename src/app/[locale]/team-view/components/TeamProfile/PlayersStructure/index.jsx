import Player from './Player'
import StadiumSpinner from 'app/[locale]/play/[league]/[id]/(with-tour)/components/StadiumSpinner'
import { useSelector } from 'react-redux'
import {
  selectDEF,
  selectGOA,
  selectMID,
  selectSTR,
} from 'app/lib/features/teamPlayer/teamPlayer.selector'
import {
  PlayersStructureContainer,
  GOAContainer,
  DEFContainer,
  MIDContainer,
  STRContainer,
} from 'shared/PlayersStructure'

const ProfilePlayersStructure = () => {
  const { isLoading } = useSelector((state) => state.teamPlayer)
  const GOA = useSelector(selectGOA)
  const DEF = useSelector(selectDEF)
  const MID = useSelector(selectMID)
  const STR = useSelector(selectSTR)

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

export default ProfilePlayersStructure
