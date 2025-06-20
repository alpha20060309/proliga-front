'use client'

import { Home, Repeat, Users, Notebook, BarChart2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { TABS } from 'app/utils/tabs.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { cn } from '@/lib/utils'
import { Link } from 'next-view-transitions'
import { memo } from 'react'

const NavLink = ({
  href,
  icon,
  label,
  className,
  onClick,
  isDisabled,
  isActive,
}) => {
  return (
    <Link
      href={isDisabled ? '#' : href}
      onClick={isDisabled ? (e) => e.preventDefault() : onClick}
      className={cn(
        'group flex-1 cursor-pointer p-0 text-center no-underline',
        className,
        {
          'pointer-events-none': isDisabled,
          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground':
            !isDisabled,
        }
      )}
      aria-disabled={isDisabled}
      aria-label={label}
      tabIndex={isDisabled ? -1 : 0}
    >
      <div
        className={cn(
          'flex h-16 w-full flex-col items-center justify-center rounded-md p-1',
          className,
          {
            'bg-sidebar-accent': isActive && !isDisabled,
          }
        )}
      >
        {icon}
        <span className="mt-0.5 text-xs">{label}</span>
      </div>
    </Link>
  )
}

function BottomNavigation() {
  const path = usePathname()
  const { t } = useTranslation()
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const { gameTab } = useSelector((state) => state.tour)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)

  const handleTabClick = (tab) => {
    if (!currentTeam?.is_team_created && path.includes('play')) {
      return false
    }
    if (
      currentTour?.status !== TOUR_STATUS.notStartedTransfer &&
      tab === TABS.Transfer &&
      path.includes('play')
    ) {
      return false
    }
    return true
  }

  const getTabStyles = (tab) => {
    if (!path.includes('play')) {
      return 'text-sidebar-foreground  hover:text-sidebar-accent-foreground'
    }

    if (!currentTeam?.is_team_created) {
      if (gameTab === tab && gameTab === TABS.Transfer) {
        return path.includes('play')
          ? 'text-sidebar-primary-foreground'
          : 'text-sidebar-foreground'
      }
      return 'text-sidebar-foreground opacity-50'
    }

    if (
      currentTour?.status !== TOUR_STATUS.notStartedTransfer &&
      tab === TABS.Transfer
    ) {
      return 'text-sidebar-foreground opacity-50'
    }

    return gameTab === tab && path.includes('play')
      ? 'text-sidebar-primary-foreground'
      : 'text-sidebar-foreground hover:text-sidebar-accent-foreground'
  }

  const navItems = [
    {
      id: TABS.GameProfile,
      icon: <Home className="size-4.5" />,
      labelKey: 'Profil',
      tab: TABS.GameProfile,
    },
    {
      id: TABS.Transfer,
      icon: <Repeat className="size-4.5" />,
      labelKey: 'Transferlar',
      tab: TABS.Transfer,
    },
    {
      id: TABS.Tournament,
      icon: <Users className="size-4.5" />,
      labelKey: 'Turnir',
      tab: TABS.Tournament,
    },
    {
      id: TABS.Journal,
      icon: <Notebook className="size-4.5" />,
      labelKey: 'Jurnal',
      tab: TABS.Journal,
    },
    {
      id: TABS.Statistics,
      icon: <BarChart2 className="size-4.5" />,
      labelKey: 'Statistika',
      tab: TABS.Statistics,
    },
  ]

  return (
    <nav
      className={cn(
        'border-sidebar-border bg-sidebar text-sidebar-foreground fixed inset-x-0 bottom-0 z-50 mx-4 mb-4 flex h-14 items-center justify-between gap-0 overflow-hidden rounded-md border-t shadow backdrop-blur lg:hidden',
        !lastVisitedTeam && 'hidden'
      )}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.id}
          icon={item.icon}
          label={t(item.labelKey)}
          onClick={() => handleTabClick(item.tab)}
          className={getTabStyles(item.tab)}
          href={lastVisitedTeam ? `/play/${lastVisitedTeam}#${item.tab}` : '#'}
          isDisabled={!lastVisitedTeam}
          isActive={false}
        />
      ))}
    </nav>
  )
}

export default memo(BottomNavigation)
