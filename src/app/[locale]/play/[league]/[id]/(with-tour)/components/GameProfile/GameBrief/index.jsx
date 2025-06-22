'use client'

import { formatDate } from 'app/utils/formatDate.util'
import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { TOUR_STATUS } from 'app/utils/tour.util'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import GameBriefSkeleton from './Skeleton'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.selector'
import {
  selectCurrentTour,
  selectTours,
} from 'app/lib/features/tour/tour.selector'
import {
  selectCurrentTourTeam,
  selectTourTeams,
} from 'app/lib/features/tourTeam/tourTeam.selector'
import { Copy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const GameBrief = () => {
  const [nextTour, setNextTour] = useState(null)
  const [prevTour, setPrevTour] = useState(null)
  const [prevTourTeam, setPrevTourTeam] = useState(null)
  const { currentTourIndex, isLoading: toursLoading } = useSelector(
    (store) => store.tour
  )
  const currentTour = useSelector(selectCurrentTour)
  const tours = useSelector(selectTours)
  const { isLoading: teamLoading } = useSelector((store) => store.currentTeam)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const { isLoading: tourTeamsLoading } = useSelector((store) => store.tourTeam)
  const tourTeams = useSelector(selectTourTeams)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const { teamPrice } = useSelector((store) => store.teamPlayer)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()
  const date = formatDate(nextTour?.datetime_start)
  const transferDate = formatDate(currentTour?.datetime_start)
  const isLoading = useMemo(
    () => toursLoading || teamLoading || tourTeamsLoading,
    [toursLoading, teamLoading, tourTeamsLoading]
  )
  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  useEffect(() => {
    if (tours.length > 0 && currentTourIndex > 0) {
      const nextTour = tours[currentTourIndex + 1]
      setNextTour(nextTour)
      const prevTour = tours[currentTourIndex - 1]
      setPrevTour(prevTour)
      const prevTourTeam = tourTeams.find((t) => t.tour_id === prevTour.id)
      setPrevTourTeam(prevTourTeam)
    }
  }, [currentTourIndex, tours, tourTeams])

  const handleClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  return (
    <Card
      className={
        'border-border relative mx-auto w-full lg:w-[55%] gap-0 lg:mx-0 max-w-2xl py-7.5 xl:h-min'
      }
    >
      <CardContent
        className={cn(
          'animate-in fade-in flex h-full w-full flex-col justify-between gap-4 xl:gap-6 duration-300',
          isLoading ? 'justify-center' : 'justify-between'
        )}
      >
        {isLoading ? (
          <GameBriefSkeleton />
        ) : (
          <>
            <Container className="border-border border-b">
              <Item>
                <Title>{t('Team id')}</Title>
                <Content
                  className={
                    'flex cursor-pointer items-center justify-center gap-0.5 hover:underline'
                  }
                  onClick={() => handleClick(currentTeam?.id)}
                >
                  <Copy className="size-5" />
                  {currentTeam?.id}
                </Content>
              </Item>
              <Item>
                <Title>{t('Nomi')}</Title>
                <Content className={'normal-case'}>{currentTeam?.name}</Content>
              </Item>
            </Container>
            <Container className="border-border border-b">
              <Item>
                <Title> {t('Keyingi Tur')}</Title>
                {currentTour?.status !== TOUR_STATUS.notStartedTransfer ? (
                  <Content className="text-sm uppercase md:text-base">
                    {getCorrectName({
                      lang,
                      uz: nextTour?.name,
                      ru: nextTour?.name_ru,
                    })}
                  </Content>
                ) : (
                  <Content>
                    {getCorrectName({
                      lang,
                      uz: currentTour?.name,
                      ru: currentTour?.name_ru,
                    })}
                  </Content>
                )}
              </Item>
              <Item>
                <Title>{t('Deadline')}</Title>
                {currentTour?.status !== TOUR_STATUS.notStartedTransfer ? (
                  <Content>{date}</Content>
                ) : (
                  <Content>{transferDate}</Content>
                )}
              </Item>
            </Container>
            <Container className="border-border border-b">
              <Item>
                <Title>{t('Tur')}</Title>
                {currentTour?.status !== TOUR_STATUS.notStartedTransfer ? (
                  <Content>
                    {getCorrectName({
                      lang,
                      uz: currentTour?.name,
                      ru: currentTour?.name_ru,
                    }) ?? ''}
                  </Content>
                ) : (
                  <Content>
                    {getCorrectName({
                      lang,
                      uz: prevTour?.name,
                      ru: prevTour?.name_ru,
                    })}
                  </Content>
                )}
              </Item>
              <Item>
                <Title>{t('Turdagi ochkolar')}</Title>
                {currentTour?.status !== TOUR_STATUS.notStartedTransfer ? (
                  <Content>{currentTourTeam?.point ?? '0'}</Content>
                ) : (
                  <Content>{prevTourTeam?.point ?? '0'}</Content>
                )}
              </Item>
            </Container>
            <Container className="border-border border-b">
              <Item>
                <Title>{t('Turnirdagi ochkolar')}</Title>
                <Content>{currentTeam?.point ?? '0'}</Content>
              </Item>
              <Item>
                <Title>{t("Turnirdagi o'rtacha ochkolar")}</Title>
                <Content>
                  {currentCompetition?.average_team_point ?? '0'}
                </Content>
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
                <Title className="">{t("Ligadagi o'rin")}</Title>
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
                  {teamPrice ?? 0}
                </Content>
              </Item>
              <Item>
                <Title>{t('Balans')}</Title>
                <Content className={'flex items-center gap-1'}>
                  {teamBalance ?? 0}
                </Content>
              </Item>
            </Container>
          </>
        )}
      </CardContent>
    </Card>
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
    <h3 className={cn('text-foreground/80 text-base', className)}>
      {children}
    </h3>
  )
}

const Content = ({ children, className, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={cn(
        'text-foreground text-end text-sm uppercase xl:text-base',
        className
      )}
    >
      {children}
    </p>
  )
}

export default GameBrief
