import { selectCurrentMatch } from 'app/lib/features/matches/matches.selector'
import { Timer } from 'lucide-react'
import { useSelector } from 'react-redux'
import { staticPath, getUrl } from 'app/utils/static.util'
import { useMemo } from 'react'
import { MATCH_STATUS } from 'app/utils/players.util'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { useTranslation } from 'react-i18next'

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

  const renderMatchStatus = (status) => {
    switch (status) {
      case MATCH_STATUS.NOT_STARTED:
        return <p>{t('Boshlanmagan')}</p>
      case MATCH_STATUS.INPROCESS:
        return (
          <p className="animate-pulse text-neutral-400">{t('Jarayonda')}</p>
        )
      case MATCH_STATUS.FINISHED:
        return <p>{t('Tugagan')}</p>
      default:
        return null
    }
  }
  console.log(currentMatch)

  return (
    <section className="h-min bg-gradient-to-r from-blue-800/20 via-yellow-800/20 to-red-800/20 py-4">
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-[40%] flex-col items-center justify-center gap-2 text-center">
          <img
            src={getUrl(homeImg)}
            alt="Arsenal"
            className="size-16 rounded-full shadow shadow-neutral-400"
          />
          <h3 className="font-bold">
            {' '}
            {getCorrectName({
              lang,
              uz: currentMatch?.home_club_id?.name,
              ru: currentMatch?.home_club_id?.name_ru,
            })}
          </h3>
        </div>
        <ScoreBoard match={currentMatch} />
        <div className="flex w-[40%] flex-col items-center justify-center gap-2 text-center">
          <img
            src={getUrl(awayImg)}
            alt="Manchester City"
            className="size-16 rounded-full shadow shadow-neutral-400"
          />
          <h3 className="font-bold">
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

const ScoreBoard = ({ match }) => {
  const { t } = useTranslation()

  switch (match?.status) {
    case MATCH_STATUS.NOT_STARTED:
      return (
        <div className="flex w-[20%] flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-neutral-50">0</span>
            <span className="text-4xl font-light text-gray-400">:</span>
            <span className="text-4xl font-bold text-neutral-50">0</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-full bg-neutral-950 px-2 py-1 text-sm text-neutral-200">
            {t('Boshlanmagan')}
          </div>
        </div>
      )
    case MATCH_STATUS.INPROCESS:
      return (
        <div className="flex w-[20%] flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-neutral-50">2</span>
            <span className="text-4xl font-light text-gray-400">:</span>
            <span className="text-4xl font-bold text-neutral-50">1</span>
          </div>
          <div className="flex animate-pulse items-center justify-center gap-1 rounded-full bg-neutral-950 px-2 py-1 text-sm text-neutral-200">
            {t('Jarayonda')}
          </div>
        </div>
      )
    case MATCH_STATUS.FINISHED:
      return (
        <div className="flex w-[20%] flex-col items-center justify-center gap-2 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-bold text-neutral-50">2</span>
            <span className="text-4xl font-light text-gray-400">:</span>
            <span className="text-4xl font-bold text-neutral-50">1</span>
          </div>
          <div className="flex items-center justify-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm text-green-400">
            <Timer className="h-4 w-4" />
            <span>
              {match?.match_min}`
              {match?.additional_min && `+ ${match?.additional_min}`}
            </span>
          </div>
        </div>
      )
    default:
      return null
  }
}

export default MatchEventScore
