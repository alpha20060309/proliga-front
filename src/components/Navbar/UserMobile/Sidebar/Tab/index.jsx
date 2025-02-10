'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setTab } from 'app/lib/features/tour/tour.slice'
import { sidebarStyles } from '../sidebarStyles.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { cn } from '@/lib/utils'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { TABS } from 'app/utils/tabs.util'
import { usePathname } from 'next/navigation'
import { tabStyling } from 'components/Navbar/tabStyling.util'
import { TOUR_STATUS } from 'app/utils/tour.util'

const SidebarTab = ({ title, tab, toggleModal }) => {
  const path = usePathname()
  const dispatch = useDispatch()
  const { gameTab } = useSelector((state) => state.tour)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)

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
    return
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
            DISABLED: sidebarStyles.disabledIndicator,
            gameTab,
            path,
            currentTeam,
            currentTour,
          })
        )}
      />
      <button
        className={cn(
          'select-none transition-all hover:text-white',
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
      >
        {title}
      </button>
    </div>
  )
}

export default SidebarTab
