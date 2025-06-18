'use client'

import { Link } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { TABS } from 'app/utils/tabs.util'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { cn } from '@/lib/utils'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'

const PlayLinks = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const currentTour = useSelector(selectCurrentTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const { gameTab } = useSelector((state) => state.tour)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)

  // const styling = (tab) => {
  //   if (!currentTeam?.is_team_created) {
  //     // if (gameTab === tab && gameTab === TABS.Transfer) {
  //     //   return path.includes('play') ? ACTIVE : PASSIVE
  //     // }
  //     return DISABLED
  //   }

  //   if (currentTour?.status !== TOUR_STATUS.notStartedTransfer) {
  //     if (tab === TABS.Transfer) {
  //       return DISABLED
  //     }
  //   }

  //   return gameTab === tab
  //     ? path.includes('play')
  //       ? ACTIVE
  //       : PASSIVE
  //     : PASSIVE
  // }

  const styling = () => {}

  return (
    <section className="text-foreground bold hidden items-center gap-2 sm:text-sm lg:flex xl:gap-4 xl:text-base 2xl:gap-6">
      {lastVisitedTeam && (
        <>
          <TabLink title={'Profil'} styling={styling} tab={TABS.GameProfile} />
          <TabLink
            title={'Transferlar'}
            tab={TABS.Transfer}
            styling={styling}
          />
          <TabLink title={'Turnir'} styling={styling} tab={TABS.Tournament} />
          <TabLink title={'Jurnal'} tab={TABS.Journal} styling={styling} />
          <TabLink
            title={'Statistika'}
            tab={TABS.Statistics}
            styling={styling}
          />
        </>
      )}
      <Link
        className={cn(
          'hover:text-foreground relative transition-all before:absolute before:-bottom-4',
          'before:bg-accent before:hidden before:h-1 before:w-full before:rounded-md',
          path.includes('championships') ? ACTIVE : PASSIVE
        )}
        href="/championships"
      >
        {t('Chempionatlar')}
      </Link>
      <Link
        className={cn(
          'hover:text-foreground relative transition-all before:absolute before:-bottom-4',
          'before:bg-accent before:hidden before:h-1 before:w-full before:rounded-md',
          path.includes('prizes') ? ACTIVE : PASSIVE
        )}
        href="/prizes"
      >
        {t('Yutuqlar')}
      </Link>
      <Link
        className={cn(
          'hover:text-foreground relative transition-all before:absolute before:-bottom-4',
          'before:bg-accent before:hidden before:h-1 before:w-full before:rounded-md',
          path.includes('regulation') ? ACTIVE : PASSIVE
        )}
        href="/regulation"
      >
        {t('Qoidalar')}
      </Link>
    </section>
  )
}

const TabLink = ({ title, tab, styling }) => {
  const currentCompetition = useSelector(selectCurrentCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const { t } = useTranslation()

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

    return
  }

  const correctTab = tab !== TABS.GameProfile ? tab : ''

  return (
    <Link
      className={cn(
        'relative transition-all before:absolute before:-bottom-4 before:hidden before:h-1',
        'before:bg-accent hover:text-foreground before:w-full before:rounded-md',
        styling(tab)
      )}
      onClick={handleClick}
      href={`/play/${currentCompetition?.id}/${currentTeam?.id}/${correctTab}`}
    >
      {t(title)}
    </Link>
  )
}

const ACTIVE = 'before:block before:bg-primary'
const PASSIVE = ' hover:before:block'
const DISABLED =
  'text-muted-foreground cursor-default hover:text-muted-foreground'

export default PlayLinks
