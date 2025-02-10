import { selectCurrentMatch } from 'app/lib/features/matches/matches.selector'
import { Timer } from 'lucide-react'
import { useSelector } from 'react-redux'
import { staticPath, getUrl } from 'app/utils/static.util'
import { useMemo } from 'react'
import { MATCH_STATUS } from 'app/utils/match.util'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const MatchEventScore = () => {
  const currentMatch = useSelector(selectCurrentMatch)
  const { lang } = useSelector((store) => store.systemLanguage)

  const homeImg = useMemo(
    () =>
      staticPath +
      '/club-jpeg/' +
      currentMatch?.home_club_id?.slug +
      '/logo.jpeg',
    [currentMatch?.home_club_id?.slug]
  )
  const awayImg = useMemo(
    () =>
      staticPath +
      '/club-jpeg/' +
      currentMatch?.away_club_id?.slug +
      '/logo.jpeg',
    [currentMatch?.away_club_id?.slug]
  )

  return (
    <section className="h-min bg-gradient-to-r from-blue-800/20 via-yellow-800/20 to-red-800/20 py-3">
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-1/3 flex-col items-center justify-center gap-2 text-center sm:w-[40%]">
          <img
            src={getUrl(homeImg)}
            alt="Arsenal"
            className="size-10 rounded-full shadow shadow-neutral-400 sm:size-16"
          />
          <h3 className="text-sm font-bold sm:text-base">
            {getCorrectName({
              lang,
              uz: currentMatch?.home_club_id?.name,
              ru: currentMatch?.home_club_id?.name_ru,
            })}
          </h3>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center gap-2 text-center sm:w-[20%]">
          <section className="flex items-center justify-center gap-3">
            <span className="text-3xl font-bold text-neutral-50 sm:text-4xl">
              {currentMatch?.home_club_result || 0}
            </span>
            <span className="text-3xl font-light text-gray-400 sm:text-4xl">
              :
            </span>
            <span className="text-3xl font-bold text-neutral-50 sm:text-4xl">
              {currentMatch?.away_club_result || 0}
            </span>
          </section>
          <ScoreBoard match={currentMatch} />
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center gap-2 text-center sm:w-[40%]">
          <img
            src={getUrl(awayImg)}
            alt="Manchester City"
            className="size-10 rounded-full shadow shadow-neutral-400 sm:size-16"
          />
          <h3 className="text-sm font-bold sm:text-base">
            {getCorrectName({
              lang,
              uz: currentMatch?.away_club_id?.name,
              ru: currentMatch?.away_club_id?.name_ru,
            })}
          </h3>
        </div>
      </div>
    </section>
  )
}

const ScoreBoard = () => {
  const { t } = useTranslation()
  const match = useSelector(selectCurrentMatch)

  switch (match?.status) {
    case MATCH_STATUS.NOT_STARTED:
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-xs sm:w-auto sm:text-sm',
            'bg-neutral-950 text-neutral-200'
          )}
        >
          {t('Boshlanmagan')}
        </div>
      )
    case MATCH_STATUS.INPROCESS:
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-xs sm:w-auto sm:text-sm',
            'animate-pulse bg-neutral-950 text-neutral-200'
          )}
        >
          {t('Jarayonda')}
        </div>
      )
    case MATCH_STATUS.FINISHED:
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-xs sm:w-auto sm:text-sm',
            'bg-green-500/20 text-green-400'
          )}
        >
          <Timer className="h-4 w-4" />
          <span>
            {match?.match_min}`
            {match?.additional_min && `+ ${match?.additional_min}`}
          </span>
        </div>
      )
    default:
      return null
  }
}

export default MatchEventScore
