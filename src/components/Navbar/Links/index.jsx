'use client'

import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { TABS } from 'app/utils/tabs.util'
import { setTab } from 'app/lib/features/tour/tour.slice'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'app/lib/features/tour/tour.selector'
import { cn } from '@/lib/utils'

const PlayLinks = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const currentTour = useSelector(selectCurrentTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const { gameTab } = useSelector((state) => state.tour)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)

  const styling = (tab) => {
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

    return gameTab === tab
      ? path.includes('play')
        ? ACTIVE
        : PASSIVE
      : PASSIVE
  }

  return (
    <section className="hidden items-center gap-2 text-neutral-400 sm:text-sm lg:flex xl:gap-4 xl:text-base 2xl:gap-6">
      {path.includes('play') && (
        <>
          <Tab title={'Profil'} styling={styling} tab={TABS.GameProfile} />
          <Tab title={'Transferlar'} styling={styling} tab={TABS.Transfer} />
          <Tab title={'Turnir'} styling={styling} tab={TABS.Tournament} />
          <Tab title={'Jurnal'} styling={styling} tab={TABS.Journal} />
          <Tab title={'Statistika'} styling={styling} tab={TABS.Statistics} />
        </>
      )}
      {!path.includes('play') && lastVisitedTeam && (
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
          'relative transition-all before:absolute before:-bottom-4 hover:text-white',
          'before:hidden before:h-1 before:w-full before:rounded-md before:bg-neutral-100',
          path.includes('championships') ? ACTIVE : PASSIVE
        )}
        href="/championships"
      >
        {t('Chempionatlar')}
      </Link>
      <Link
        className={cn(
          'relative transition-all before:absolute before:-bottom-4 hover:text-white',
          'before:hidden before:h-1 before:w-full before:rounded-md before:bg-neutral-100',
          path.includes('prizes') ? ACTIVE : PASSIVE
        )}
        href="/prizes"
      >
        {t('Yutuqlar')}
      </Link>
      <Link
        className={cn(
          'relative transition-all before:absolute before:-bottom-4 hover:text-white',
          'before:hidden before:h-1 before:w-full before:rounded-md before:bg-neutral-100',
          path.includes('regulation') ? ACTIVE : PASSIVE
        )}
        href="/regulation"
      >
        {t('Qoidalar')}
      </Link>
    </section>
  )
}

const Tab = ({ title, tab, styling }) => {
  const dispatch = useDispatch()
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
    window.location.hash = tab
    return dispatch(setTab(tab))
  }

  return (
    <button
      className={cn(
        'relative transition-all before:absolute before:-bottom-4 before:hidden before:h-1',
        'before:w-full before:rounded-md before:bg-neutral-100 hover:text-white',
        styling(tab)
      )}
      onClick={handleClick}
    >
      {t(title)}
    </button>
  )
}

const TabLink = ({ title, tab, styling }) => {
  const dispatch = useDispatch()
  const currentTour = useSelector(selectCurrentTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
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

    return dispatch(setTab(tab))
  }

  return (
    <Link
      className={cn(
        'relative transition-all before:absolute before:-bottom-4 before:hidden before:h-1',
        'before:w-full before:rounded-md before:bg-neutral-100 hover:text-white',
        styling(tab)
      )}
      onClick={handleClick}
      href={'/play/' + lastVisitedTeam}
    >
      {t(title)}
    </Link>
  )
}

const ACTIVE = 'before:block before:bg-primary text-white'
const PASSIVE = ' hover:before:block'
const DISABLED = 'text-neutral-600 cursor-default hover:text-neutral-500'

export default PlayLinks
