'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Timer } from 'lucide-react'
import { MATCH_EVENTS } from 'app/utils/players.util'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { DialogDescription } from '@radix-ui/react-dialog'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('online')

  return (
    <div className="flex min-h-screen items-center justify-center gap-0 space-y-0 bg-gray-950">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-black/90"
          >
            View Match Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-2xl gap-0 space-y-0 rounded-xl bg-gradient-to-b from-gray-900 via-neutral-950 to-black p-0 text-white shadow-sm shadow-neutral-700">
          <section className="relative border-b border-white/10 p-4">
            <DialogTitle className="text-center text-xl font-semibold">
              Premier League
            </DialogTitle>
            <div className="mt-1 text-center text-sm text-gray-400">
              Matchday 26 • Emirates Stadium
            </div>
          </section>
          <DialogDescription className="hidden"></DialogDescription>
          {/* Score Section */}
          <div className="bg-gradient-to-r from-blue-800/20 via-yellow-800/20 to-red-800/20 py-4">
            <div className="] flex items-center justify-center gap-8">
              <div className="flex w-[40%] flex-col items-center justify-center gap-2 text-center">
                <img
                  src="../static/club-jpeg/arsenal/logo.jpeg"
                  alt="Arsenal"
                  className="size-16 rounded-full"
                />
                <div className="font-bold">Arsenal</div>
              </div>
              <div className="w-[20%] text-center">
                <div className="mb-2 flex items-center justify-center gap-3">
                  <span className="text-4xl font-bold">2</span>
                  <span className="text-4xl font-light text-gray-400">:</span>
                  <span className="text-4xl font-bold">1</span>
                </div>
                <div className="flex items-center justify-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm text-green-400">
                  <Timer className="h-4 w-4" />
                  <span>90`+4</span>
                </div>
              </div>
              <div className="flex w-[40%] flex-col items-center justify-center gap-2 text-center">
                <img
                  src="../static/club-jpeg/manchester-city/logo.jpeg"
                  alt="Manchester City"
                  className="size-16 rounded-full"
                />
                <div className="font-bold">Manchester City</div>
              </div>
            </div>
          </div>

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
        </DialogContent>
      </Dialog>
    </div>
  )
}

const MatchEvent = ({ event }) => {
  const { t } = useTranslation()
  const renderIcon = (type) => {
    // <span className="flex size-8 items-center justify-center rounded-md bg-neutral-800 p-1"></span>
    switch (type) {
      case MATCH_EVENTS.GOAL:
        return (
          <img src="./icons/football.svg" alt="Arsenal" className="size-7" />
        )
      case MATCH_EVENTS.MISSED_PENALTY:
        return (
          <img
            src="./icons/missed-penalty.svg"
            alt="Arsenal"
            className="size-6"
          />
        )
      case MATCH_EVENTS.HIT_PENALTY:
        return (
          <img src="./icons/hit-penalty.svg" alt="Arsenal" className="size-6" />
        )
      case MATCH_EVENTS.TRANSFER:
        return (
          <img
            src="./icons/arrows-transfer.svg"
            alt="Arsenal"
            className="size-7"
          />
        )
      case MATCH_EVENTS.RED_CARD:
        return (
          <img
            src="./icons/soccer-card.svg"
            alt="Arsenal"
            className="filter-red-600 size-7"
          />
        )
      case MATCH_EVENTS.YELLOW_CARD:
        return (
          <img
            src="./icons/soccer-card.svg"
            alt="Arsenal"
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
            <div className="font-medium">{event.player_name}</div>
            {event.second_player_name && (
              <div className="text-sm text-white/50">
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
    second_player_name: 'Льюис-Скелли',
    minute: 90,
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

export default App
