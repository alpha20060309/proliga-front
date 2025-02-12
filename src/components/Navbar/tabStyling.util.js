import { TABS } from 'app/utils/tabs.util'
import { TOUR_STATUS} from 'app/utils/tour.util'

export const tabStyling = ({
  tab,
  ACTIVE,
  PASSIVE,
  DISABLED,
  gameTab,
  path,
  currentTeam,
  currentTour,
}) => {
  if (!currentTeam?.is_team_created) {
    if (gameTab === tab && gameTab === TABS.Transfer) {
      return path.includes('play') ? ACTIVE : PASSIVE
    }
    return DISABLED
  }

  if (currentTour?.status !== TOUR_STATUS.notStartedTransfer) {
    if (tab === TABS.Transfer) {
      return DISABLED
    }
  }

  return gameTab === tab ? (path.includes('play') ? ACTIVE : PASSIVE) : PASSIVE
}
