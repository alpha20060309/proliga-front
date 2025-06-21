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
import { useEffect, useState } from 'react'

const PlayLinks = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const currentTour = useSelector(selectCurrentTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const [gameTab, setGameTab] = useState('')
  const isPlayRoute = path.includes('play')

  useEffect(() => {
    const pathLength = path.split('/').length

    if (path.includes('play') && pathLength === 6) {
      Object.keys(TABS).forEach((tab) => {
        if (path.includes(TABS[tab])) {
          setGameTab(TABS[tab])
        }
      })
    } else {
      setGameTab(TABS.GameProfile)
    }
  }, [path])

  return (
    <section className="text-foreground bold hidden items-center gap-2 sm:text-sm lg:flex xl:gap-4 xl:text-base 2xl:gap-6">
      {lastVisitedTeam && (
        <>
          <TabLink
            title={'Profil'}
            styling={
              isPlayRoute
                ? gameTab === TABS.GameProfile
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            disabled={!currentTeam?.is_team_created}
            tab={TABS.GameProfile}
            setTab={setGameTab}
          />
          <TabLink
            title={'Transferlar'}
            tab={TABS.Transfer}
            disabled={
              currentTour?.status !== TOUR_STATUS.notStartedTransfer ||
              !currentTeam?.is_team_created
            }
            styling={
              isPlayRoute
                ? gameTab === TABS.Transfer
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            setTab={setGameTab}
          />
          <TabLink
            title={'Turnir'}
            disabled={!currentTeam?.is_team_created}
            styling={
              isPlayRoute
                ? gameTab === TABS.Tournament
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            tab={TABS.Tournament}
            setTab={setGameTab}
          />
          <TabLink
            title={'Jurnal'}
            disabled={!currentTeam?.is_team_created}
            tab={TABS.Journal}
            styling={
              isPlayRoute
                ? gameTab === TABS.Journal
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            setTab={setGameTab}
          />
          <TabLink
            title={'Statistika'}
            tab={TABS.Statistics}
            styling={
              isPlayRoute
                ? gameTab === TABS.Statistics
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            disabled={!currentTeam?.is_team_created}
            setTab={setGameTab}
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

const TabLink = ({ title, tab, styling, disabled = false }) => {
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
        styling
      )}
      disabled={disabled}
      onClick={handleClick}
      href={`/play/${currentCompetition?.id}/${currentTeam?.id}/${correctTab}`}
    >
      {t(title)}
    </Link>
  )
}

const ACTIVE = 'before:block before:bg-primary'
const PASSIVE = ' hover:before:block'

export default PlayLinks
