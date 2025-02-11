import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarStyles } from '../sidebarStyles.util'
import { setTab } from 'app/lib/features/tour/tour.slice'
import { cn } from '@/lib/utils'
import { tabStyling } from 'components/Navbar/tabStyling.util'
import { usePathname } from 'next/navigation'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { TABS } from 'app/utils/tabs.util'
import { TOUR_STATUS } from 'app/utils/tour.util'

const SidebarTabLink = ({ title, tab, toggleModal }) => {
  const dispatch = useDispatch()
  const path = usePathname()
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const { gameTab } = useSelector((state) => state.tour)
  const { lastVisitedTeam } = useSelector((state) => state.currentTeam)

  const handleClick = () => {
    if (!currentTeam?.is_team_created) {
      return
    }
    if (
      currentTour?.status !== TOUR_STATUS.notStartedTransfer &&
      tab === TABS.Transfer
    ) {
      return
    }

    dispatch(setTab(tab))
    toggleModal()
  }

  return (
    <div className="group flex w-full gap-4">
      <span
        className={cn(
          'block h-full w-2 rounded-md',
          tabStyling({
            tab,
            ACTIVE: sidebarStyles.activeIndicator,
            PASSIVE: sidebarStyles.passiveIndicator,
            DISABLED: sidebarStyles.disabled,
            gameTab,
            path,
            currentTeam,
            currentTour,
          })
        )}
      />
      <Link
        className={cn(
          'block h-full w-2 select-none rounded-md',
          tabStyling({
            tab,
            ACTIVE: sidebarStyles.active,
            PASSIVE: sidebarStyles.passive,
            DISABLED: sidebarStyles.disabled,
            gameTab,
            path,
            currentTeam,
            currentTour,
          })
        )}
        onClick={handleClick}
        href={'/play/' + lastVisitedTeam}
      >
        {title}
      </Link>
    </div>
  )
}

export default SidebarTabLink
