import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { staticPath } from 'app/utils/static.util'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { formatDate } from 'app/utils/formatDate.util'
import { useMemo } from 'react'
import { getUrl } from 'app/utils/static.util'
import { MATCH_STATUS } from 'app/utils/players.util'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentMatch,
  setMatchModalOpen,
} from 'app/lib/features/matches/matches.slice'
import { getCorrectName } from 'app/utils/getCorrectName.util'

const Match = ({ match }) => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()
  const homeClub = match?.home_club_id ?? null
  const awayClub = match?.away_club_id ?? null
  const date = formatDate(match?.started_date, 'matches')

  const homeImg = useMemo(
    () => staticPath + '/club-jpeg/' + homeClub?.slug + '/logo.jpeg',
    [homeClub?.slug]
  )
  const awayImg = useMemo(
    () => staticPath + '/club-jpeg/' + awayClub?.slug + '/logo.jpeg',
    [awayClub?.slug]
  )

  const homeScore = parseInt(match?.home_club_result) || 0
  const awayScore = parseInt(match?.away_club_result) || 0
  const isHomeWinner = homeScore > awayScore
  const isAwayWinner = awayScore > homeScore
  const isDraw = match?.status === 'finished' && homeScore === awayScore

  const handleClick = () => {
    dispatch(setCurrentMatch(match))
    dispatch(setMatchModalOpen(true))
  }

  return (
    <article
      onClick={handleClick}
      className="flex h-12 w-full items-center rounded-lg border border-neutral-800 bg-neutral-900/80 px-1 xs:px-2"
    >
      <TeamDisplay
        name={getCorrectName({
          lang,
          uz: homeClub?.name,
          ru: homeClub?.name_ru,
        })}
        logo={homeImg}
        isWinner={isHomeWinner}
        isDraw={isDraw}
        alignment="left"
      />
      <div className="flex w-[30%] flex-col items-center justify-center gap-0.5">
        <MatchStatus
          status={match?.status}
          homeScore={homeScore}
          awayScore={awayScore}
        />
        <TooltipProvider>
          <Tooltip className="m-0 p-0">
            <TooltipTrigger className="text-xs font-medium leading-3 tracking-wider">
              <time>{date}</time>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('Match start time')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <TeamDisplay
        name={getCorrectName({
          lang,
          uz: awayClub?.name,
          ru: awayClub?.name_ru,
        })}
        logo={awayImg}
        isWinner={isAwayWinner}
        isDraw={isDraw}
        alignment="right"
        match={match}
      />
    </article>
  )
}

const TeamDisplay = ({ name, logo, isWinner, isDraw, alignment, match }) => {
  return (
    <div
      className={cn(
        'flex h-full w-[35%] items-center gap-x-1 xs:gap-x-2',
        alignment === 'right' &&
          'w-1/3 flex-row-reverse items-center space-x-reverse',
        isWinner && 'font-bold'
      )}
    >
      <div
        className={cn(
          'relative',
          isWinner &&
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:animate-ping after:rounded-full after:bg-primary after:opacity-75 after:content-['']",
          isDraw &&
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:animate-ping after:rounded-full after:bg-neutral-500 after:opacity-50 after:content-['']"
        )}
      >
        <img
          src={getUrl(logo)}
          alt={name}
          width={40}
          height={40}
          onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
          className={cn(
            'size-7 min-w-7 rounded-full xs:size-8',
            isWinner && 'ring-2 ring-primary',
            isDraw && 'ring-2 ring-neutral-500'
          )}
        />
      </div>
      <div className="flex max-w-full flex-col truncate text-wrap">
        <span
          className={cn(
            'break-words text-xs md:text-sm',
            alignment === 'left' ? 'text-left' : 'text-right'
          )}
        >
          {name}
        </span>
        {match?.status === 'finished' && (
          <span
            className={cn(
              'text-sm',
              isWinner && 'ring-primary',
              isDraw && 'ring-neutral-500',
              alignment === 'left' ? 'text-left' : 'text-right'
            )}
          />
        )}
      </div>
    </div>
  )
}

const MatchStatus = ({ status, homeScore, awayScore }) => {
  const { t } = useTranslation()

  switch (status) {
    case MATCH_STATUS.NOT_STARTED:
      return (
        <Badge
          variant="secondary"
          className="bg-neutral-800 py-px text-[11px] sm:text-xs"
        >
          {t('Boshlanmagan')}
        </Badge>
      )
    case MATCH_STATUS.INPROCESS:
      return (
        <Badge
          variant="default"
          className="animate-pulse py-px text-[11px] sm:text-xs"
        >
          {homeScore} - {awayScore}
        </Badge>
      )
    case MATCH_STATUS.FINISHED:
      return (
        <Badge variant="outline text-[11px] sm:text-xs py-px">
          {homeScore} - {awayScore}
        </Badge>
      )
    default:
      return null
  }
}

export default Match
