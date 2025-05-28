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
import { Button } from '@/components/ui/button'

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
    window.location.hash = tab
    dispatch(setTab(tab))
    toggleModal()
  }

  const currentStyleKey = tabStyling({
    tab,
    ACTIVE: 'active',
    PASSIVE: 'passive',
    DISABLED: 'disabled',
    gameTab,
    path,
    currentTeam,
    currentTour,
  })

  const indicatorClassName = cn(
    'block h-6 w-2 rounded-md transition-colors',
    {
      [sidebarStyles.activeIndicator]: currentStyleKey === 'active',
      [sidebarStyles.passiveIndicator]: currentStyleKey === 'passive',
      [sidebarStyles.disabledIndicator]: currentStyleKey === 'disabled',
    }
  )

  const buttonClassName = cn(
    'h-auto w-full select-none justify-start px-2 py-1.5 text-base font-normal transition-colors rounded-sm',
    {
      [sidebarStyles.active]: currentStyleKey === 'active',
      [sidebarStyles.passive]: currentStyleKey === 'passive',
      [sidebarStyles.disabled]: currentStyleKey === 'disabled',
    }
  )

  const isButtonDisabled = currentStyleKey === 'disabled'

  return (
    <div className="group flex w-full items-center gap-4">
      <span
        className={indicatorClassName}
        aria-hidden="true"
      />
      <Button
        className={buttonClassName}
        onClick={handleClick}
        aria-label={title}
        disabled={isButtonDisabled}
        tabIndex={isButtonDisabled ? -1 : 0}
      >
        {title}
      </Button>
    </div>
  )
}

export default SidebarTab
