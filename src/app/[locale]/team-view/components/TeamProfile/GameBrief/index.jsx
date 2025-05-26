'use client'

import {
  selectCurrentTour,
  selectTours,
} from 'app/lib/features/tour/tour.selector'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { Coins, PercentCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTourTeam } from 'app/lib/features/tourTeam/tourTeam.selector'
import { formatDate } from 'app/utils/formatDate.util'
import GameBriefSkeleton from 'app/[locale]/play/components/GameProfile/GameBrief/Skeleton'
import { Copy } from 'lucide-react'

const GameBrief = () => {
  const { t } = useTranslation()
  const [nextTour, setNextTour] = useState(null)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { currentTourIndex, isLoading } = useSelector((store) => store.tour)
  const currentTour = useSelector(selectCurrentTour)
  const tours = useSelector(selectTours)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const { teamPrice } = useSelector((store) => store.teamPlayer)

  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  useEffect(() => {
    if (tours.length > 0) {
      const nextTour = tours[currentTourIndex + 1]
      setNextTour(nextTour)
    }
  }, [tours, currentTourIndex])

  const date = new Date(nextTour?.datetime_start)
  const curDate = new Date(currentTour?.datetime_start)

  const handleClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  return (
    <section
      className={cn(
        'lg:mx-0 lg:w-1/2 lg:max-w-[24rem] lg:gap-4 lg:px-6 xl:h-min xl:max-w-136',
        'fade-in-fast mx-auto flex h-min min-h-96 w-full max-w-lg flex-col',
        'border-primary border-opacity-50 bg-background gap-3 rounded-xl border',
        'hover:border-opacity-100 p-4 transition-all',
        isLoading ? 'justify-center' : 'justify-between'
      )}
    >
      {isLoading ? (
        <GameBriefSkeleton />
      ) : (
        <>
          <Container className="border-border border-b">
            <Item>
              <Title className="">{t('Team id')}</Title>
              <Content
                className={
                  'flex cursor-pointer items-center justify-center gap-0.5 hover:underline'
                }
                onClick={() => handleClick(currentTeam?.id)}
              >
                <Copy className="size-5 text-foreground" />
                {currentTeam?.id}
              </Content>
            </Item>
            <Item>
              <Title>{t('Nomi')}</Title>
              <Content>{currentTeam?.name}</Content>
            </Item>
          </Container>
          <Container className="border-b border-border">
            <Item>
              <Title> {t('Keyingi Tur')}</Title>
              <Content className="text-primary text-sm md:text-base">
                {getCorrectName({
                  lang,
                  uz: nextTour?.name,
                  ru: nextTour?.name_ru,
                })}
              </Content>
            </Item>
            <Item>
              <Title>{t('Deadline')}</Title>
              {currentTour?.status !== TOUR_STATUS.notStartedTransfer ? (
                <Content>{formatDate(date)}</Content>
              ) : (
                <Content>{formatDate(curDate)}</Content>
              )}
            </Item>
          </Container>
          <Container className="border-border border-b">
            <Item>
              <Title>{t('Tur')}</Title>
              <Content>
                {getCorrectName({
                  lang,
                  uz: currentTour?.name,
                  ru: currentTour?.name_ru,
                }) ?? t('Hozirgi Tur')}
              </Content>
            </Item>
            <Item>
              <Title>{t('Turdagi ochkolar')}</Title>
              <Content>{currentTourTeam?.point ?? '0'}</Content>
            </Item>
          </Container>
          <Container className="border-border border-b">
            <Item>
              <Title>{t('Turnirdagi ochkolar')}</Title>
              <Content>{currentTeam?.point ?? '0'}</Content>
            </Item>
            <Item>
              <Title>{t("Turnirdagi o'rtacha ochkolar")}</Title>
              <Content>{currentCompetition?.average_team_point ?? '0'}</Content>
            </Item>
          </Container>
          <Container className="border-border border-b">
            <Item>
              <Title>{t('Chempionat')}</Title>
              <Content className="capitalize">
                {getCorrectName({
                  lang,
                  uz: currentTeam?.competition_id?.name,
                  ru: currentTeam?.competition_id?.name_ru,
                })}
              </Content>
            </Item>
            <Item>
              <Title className="text-foreground">{t("Ligadagi o'rin")}</Title>
              <Content className="space-x-1">
                {currentTeam?.order ?? '0'} /{' '}
                {currentCompetition?.team_count ?? '0'}
              </Content>
            </Item>
          </Container>
          <Container>
            <Item>
              <Title>{t('Jamoa narxi')}</Title>
              <Content className={'flex items-center gap-1'}>
                <PercentCircle className="text-primary/90 size-5" />
                {teamPrice ?? 0}
              </Content>
            </Item>
            <Item>
              <Title>{t('Balans')}</Title>
              <Content className={'flex items-center gap-1'}>
                <Coins className="text-primary/90 size-5" />
                {teamBalance ?? 0}
              </Content>
            </Item>
          </Container>
        </>
      )}
    </section>
  )
}

const Container = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col gap-2 pb-2', className)}>{children}</div>
  )
}
const Item = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      {children}
    </div>
  )
}

const Title = ({ children, className }) => {
  return (
    <h3 className={cn('text-foreground text-base', className)}>{children}</h3>
  )
}

const Content = ({ children, className, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={cn(
        'text-primary text-end text-sm uppercase xl:text-base',
        className
      )}
    >
      {children}
    </p>
  )
}

export default GameBrief
