'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { MATCH_EVENTS, MATCH_STATUS } from 'app/utils/players.util'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setMatchModalOpen } from 'app/lib/features/matches/matches.slice'
import { selectCurrentCompetition } from 'app/lib/features/competition/competition.selector'
import { selectCurrentMatch } from 'app/lib/features/matches/matches.selector'
import MatchEventHeader from './Header'
import MatchEventSkeleton from './Content/Skeleton'
import MatchEventScore from './Score'

function MatchEventModal() {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { isModalOpen } = useSelector((store) => store.matches)
  const currentMatch = useSelector(selectCurrentMatch)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const { t } = useTranslation()

  const setModalOpen = () => {
    dispatch(setMatchModalOpen(false))
  }

  const isLoading = true

  return (
    <Dialog open={isModalOpen && currentMatch?.id} onOpenChange={setModalOpen}>
      <DialogContent className="max-h-[90vh] max-w-2xl gap-0 rounded-xl border border-neutral-800 bg-gradient-to-b from-gray-900 via-neutral-950 to-black p-0 text-white">
        <MatchEventHeader
          started_date={currentMatch?.started_date}
          finished_date={currentMatch?.finished_date}
        />
        <DialogDescription className="hidden"></DialogDescription>
        <MatchEventScore />
        {isLoading ? (
          <MatchEventSkeleton />
        ) : (
          <section className="relative flex h-full max-h-[calc(90vh-300px)] flex-col gap-4 overflow-y-auto px-4 py-4">
            {/* Center line */}
            <span
              style={{ height: `${events?.length * 3.65 || 0}rem` }}
              className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transform bg-white/25"
            />

            {events.map((event, index) => (
              <MatchEvent key={index} event={event} />
            ))}
          </section>
        )}
      </DialogContent>
    </Dialog>
  )
}

const MatchEvent = ({ event }) => {
  const { t } = useTranslation()

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
            alt="yellow card"
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
    event.type === MATCH_EVENTS.FIRST_TIME_START ||
    event.type === MATCH_EVENTS.FIRST_TIME_END ||
    event.type === MATCH_EVENTS.SECOND_TIME_START ||
    event.type === MATCH_EVENTS.SECOND_TIME_END

  const hasSecondName =
    event.type === MATCH_EVENTS.TRANSFER || event.type === MATCH_EVENTS.GOAL
  const isTransfer = event.type === MATCH_EVENTS.TRANSFER

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        isTextOnly
          ? 'flex-col'
          : event.team === 'home'
            ? 'flex-row'
            : 'flex-row-reverse'
      )}
    >
      {isTextOnly ? (
        <div className="z-10 rounded bg-black px-3 py-1.5 text-center text-sm text-white/75">
          {renderHeader(event.type)}
        </div>
      ) : (
        <>
          <div
            className={`w-5/12 ${
              event.team === 'home' ? 'pr-4 text-right' : 'pl-4 text-left'
            }`}
          >
            <div
              className={cn('text-neutral-50', isTransfer && 'text-green-600')}
            >
              {event.player_name}
            </div>
            {event?.second_player_name && hasSecondName && (
              <div
                className={cn(
                  'text-sm text-white/50',
                  isTransfer && 'text-red-600/90'
                )}
              >
                {event.second_player_name}
              </div>
            )}
          </div>
          <div className="flex w-2/12 items-center justify-center">
            <div
              className={`z-10 flex size-10 items-center justify-center rounded-full bg-neutral-900 p-0`}
            >
              {renderIcon(event.type)}
            </div>
          </div>
          <div
            className={`w-5/12 ${
              event.team === 'home' ? 'pl-4 text-left' : 'pr-4 text-right'
            }`}
          >
            <div className="text-sm text-white/70">{event.minute}`</div>
          </div>
        </>
      )}
    </div>
  )
}

const events = [
  {
    player_name: ' Конец матча.',
    type: MATCH_EVENTS.FIRST_TIME_START,
  },
  {
    player_name: 'Калафьори',
    minute: 5,
    team: 'home',
    type: MATCH_EVENTS.HIT_PENALTY,
  },
  {
    player_name: 'Стерлинг',
    second_player_name: 'Хавертц',
    minute: 90,
    team: 'home',
    type: MATCH_EVENTS.FIRST_TIME_END,
  },
  {
    player_name: 'Стерлинг',
    minute: 90,
    team: 'home',
    type: MATCH_EVENTS.GOAL,
  },
  {
    player_name: 'Эдегор',
    minute: 90,
    second_player_name: 'Троссард',
    team: 'away',
    type: MATCH_EVENTS.GOAL,
  },
  {
    player_name: 'Мерино',
    second_player_name: 'Эдегор',
    minute: 84,
    team: 'home',
    type: MATCH_EVENTS.MISSED_PENALTY,
  },
  {
    player_name: 'Нванери',
    second_player_name: 'Троссард',
    minute: 84,
    team: 'home',
    type: MATCH_EVENTS.SECOND_TIME_START,
  },
  {
    player_name: 'Хавертц',
    second_player_name: 'Мартинелли',
    minute: 76,
    goal: true,
    team: 'home',
    type: MATCH_EVENTS.YELLOW_CARD,
  },
  {
    player_name: 'Хавертц',
    minute: 76,
    team: 'home',
    type: MATCH_EVENTS.RED_CARD,
  },
  {
    player_name: 'Хавертц',
    second_player_name: 'Мартинелли',
    minute: 76,
    goal: true,
    team: 'home',
    type: MATCH_EVENTS.TRANSFER,
  },
  {
    player_name: 'Хавертц',
    second_player_name: 'Мартинелли',
    minute: 76,
    goal: true,
    team: 'home',
    type: MATCH_EVENTS.SECOND_TIME_END,
  },
]

export default MatchEventModal
