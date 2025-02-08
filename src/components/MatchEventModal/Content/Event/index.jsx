import { MATCH_EVENTS } from 'app/utils/players.util'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { getCorrectName } from 'app/utils/getCorrectName.util'
import { eventVariants } from 'components/MatchEventModal/animations.styles'
import { cn } from '@/lib/utils'

const MatchEvent = ({ event, index }) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)

  const renderIcon = (type) => {
    switch (type) {
      case MATCH_EVENTS.GOAL:
        return <img src="/icons/football.svg" alt="GOAL" className="size-7" />
      case MATCH_EVENTS.MISSED_PENALTY:
        return (
          <img
            src="/icons/missed-penalty.svg"
            alt="missed penalty"
            className="size-6"
          />
        )
      case MATCH_EVENTS.HIT_PENALTY:
        return (
          <img
            src="/icons/hit-penalty.svg"
            alt="Penalty hit"
            className="size-6"
          />
        )
      case MATCH_EVENTS.TRANSFER:
        return (
          <img
            src="/icons/arrows-transfer.svg"
            alt="transfer players"
            className="size-7"
          />
        )
      case MATCH_EVENTS.RED_CARD:
        return (
          <img
            src="/icons/soccer-card.svg"
            alt="red card"
            className="filter-red-600 size-7"
          />
        )
      case MATCH_EVENTS.YELLOW_CARD:
        return (
          <img
            src="/icons/soccer-card.svg"
            alt="Yellow Card"
            className="filter-yellow-500 size-7"
          />
        )
      default:
        return null
    }
  }

  const renderHeader = (type) => {
    switch (type) {
      case MATCH_EVENTS.FIRST_TIME_START:
        return t('Match Start')
      case MATCH_EVENTS.FIRST_TIME_END:
        return t('Halftime')
      case MATCH_EVENTS.SECOND_TIME_START:
        return t('2nd Match Start')
      case MATCH_EVENTS.SECOND_TIME_END:
        return t('Game Ends')
      default:
        return null
    }
  }

  const isTextOnly =
    event.event_type === MATCH_EVENTS.FIRST_TIME_START ||
    event.event_type === MATCH_EVENTS.FIRST_TIME_END ||
    event.event_type === MATCH_EVENTS.SECOND_TIME_START ||
    event.event_type === MATCH_EVENTS.SECOND_TIME_END

  const hasSecondName =
    event.event_type === MATCH_EVENTS.TRANSFER ||
    event.event_type === MATCH_EVENTS.GOAL

  const hasName =
    event.event_type === MATCH_EVENTS.GOAL ||
    event.event_type === MATCH_EVENTS.TRANSFER ||
    event.event_type === MATCH_EVENTS.MISSED_PENALTY ||
    event.event_type === MATCH_EVENTS.HIT_PENALTY ||
    event.event_type === MATCH_EVENTS.RED_CARD ||
    event.event_type === MATCH_EVENTS.YELLOW_CARD

  const isHome = true

  return (
    <motion.div
      variants={eventVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={cn(
        'flex items-center justify-center',
        isTextOnly ? 'flex-col' : isHome ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {isTextOnly ? (
        <div className="z-10 rounded bg-black px-3 py-1.5 text-center text-sm text-neutral-100 shadow shadow-neutral-700">
          {renderHeader(event.event_type)}
        </div>
      ) : (
        <>
          <div
            className={cn(
              'w-5/12',
              isHome ? 'pr-4 text-right' : 'pl-4 text-left'
            )}
          >
            {hasName && (
              <div
                className={cn(
                  'text-sm text-neutral-50 md:text-base',
                  event.event_type === MATCH_EVENTS.TRANSFER && 'text-green-600'
                )}
              >
                {getCorrectName({
                  lang,
                  uz: event?.player_id?.name,
                  ru: event?.player_id?.name_ru,
                })}
              </div>
            )}
            {event?.second_player_id && hasSecondName && (
              <div
                className={cn(
                  'text-xs text-neutral-400 md:text-sm',
                  event.event_type === MATCH_EVENTS.TRANSFER && 'text-red-600'
                )}
              >
                {getCorrectName({
                  lang,
                  uz: event?.second_player_id?.name,
                  ru: event?.second_player_id?.name_ru,
                })}
              </div>
            )}
          </div>
          <div className="flex w-2/12 items-center justify-center">
            <div className="z-10 flex size-10 items-center justify-center rounded-full bg-neutral-900 shadow shadow-neutral-700">
              {renderIcon(event.event_type)}
            </div>
          </div>
          <div
            className={cn(
              'w-5/12',
              isHome ? 'pl-4 text-left' : 'pr-4 text-right'
            )}
          >
            <div className="text-sm text-white/70">{event.minute}`</div>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default MatchEvent
