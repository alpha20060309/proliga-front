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
    <section className="animate-in fade-in duration-300 xs:py-3 absolute top-0 right-0 bottom-0 left-0 z-10 grid grid-rows-4 py-2 sm:py-4">
      {isLoading ? (
        <StadiumSpinner />
      ) : (
        <>
          <div className="flex w-full items-start justify-center">
            {GOA.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </div>
          <div className="flex items-start justify-evenly ">
            {DEF.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </div>
          <div className="flex items-start justify-evenly">
            {MID.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </div>
          <div className="flex items-start justify-evenly">
            {STR.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default TransferPlayersStructure
