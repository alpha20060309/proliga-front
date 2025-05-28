import { Link } from 'next-view-transitions'
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

  const indicatorClassName = cn('block h-6 w-2 rounded-md transition-colors', {
    [sidebarStyles.activeIndicator]: currentStyleKey === 'active',
    [sidebarStyles.passiveIndicator]: currentStyleKey === 'passive',
    [sidebarStyles.disabledIndicator]: currentStyleKey === 'disabled',
  })

  const linkClassName = cn(
    'block h-auto w-full select-none justify-start px-2 py-1.5 text-base font-normal transition-colors rounded-sm',
    {
      [sidebarStyles.active]: currentStyleKey === 'active',
      [sidebarStyles.passive]: currentStyleKey === 'passive',
      [sidebarStyles.disabled]: currentStyleKey === 'disabled',
    }
  )

  const isLinkDisabled = currentStyleKey === 'disabled'

  const handleLinkClick = (e) => {
    if (isLinkDisabled) {
      e.preventDefault()
      return
    }
    handleClick()
  }

  return (
    <div className="group flex w-full items-center gap-4">
      <span className={indicatorClassName} aria-hidden="true" />
      <Link
        className={linkClassName}
        onClick={handleLinkClick}
        href={isLinkDisabled ? '#' : '/play/' + lastVisitedTeam}
        aria-disabled={isLinkDisabled}
        tabIndex={isLinkDisabled ? -1 : 0}
      >
        {title}
      </Link>
    </div>
  )
}

export default SidebarTabLink
