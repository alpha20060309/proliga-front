'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, X, Goal, AlertTriangle, Timer } from 'lucide-react'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('online')

  const events = [
    { name: 'Калафьори', subtext: 'Льюис-Скелли', time: 90, team: 'home' },
    { name: 'Стерлинг', subtext: 'Хавертц', time: 90, team: 'home' },
    { name: 'Мерино', subtext: 'Эдегор', time: 84, goal: true, team: 'home' },
    { name: 'Нванери', subtext: 'Троссард', time: 84, team: 'home' },
    {
      name: 'Хавертц',
      subtext: 'Мартинелли',
      time: 76,
      goal: true,
      team: 'home',
    },
    { name: 'де Брюйне', subtext: 'Мармуш', time: 72, team: 'away' },
    { name: 'Макати', subtext: 'Фоден', time: 72, team: 'away' },
    { name: 'Эдегор', time: 71, yellowCard: true, team: 'home' },
    {
      name: 'Льюис-Скелли',
      subtext: 'Райс',
      time: 62,
      goal: true,
      team: 'home',
    },
    { name: 'Парти', time: 56, goal: true, team: 'home' },
    { name: 'Холанд', subtext: 'Савио', time: 55, goal: true, team: 'away' },
    { text: 'Начало второго тайма.', stop: true },
    { text: 'Перерыв.', stop: true },
    { name: 'Тимбер', time: 25, yellowCard: true, team: 'away' },
    { name: 'Эдегор', subtext: 'Хавертц', time: 2, goal: true, team: 'home' },
    { text: 'Начало первого тайма.', stop: true },
  ]

  const GetIcon = (type) => {
    // <span className="flex size-8 items-center justify-center rounded-md bg-neutral-800 p-1"></span>
    switch (type) {
      case 'goal':
        return (
          <img src="./icons/football.svg" alt="Arsenal" className="size-6" />
        )
      case 'missed-penalty':
        return (
          <img
            src="./icons/missed-penalty.svg"
            alt="Arsenal"
            className="size-6"
          />
        )
      case 'hit-penalty':
        return (
          <img src="./icons/hit-penalty.svg" alt="Arsenal" className="size-6" />
        )
      case 'arrows-transfer':
        return (
          <img
            src="./icons/arrows-transfer.svg"
            alt="Arsenal"
            className="size-6"
          />
        )
      case 'soccer-card':
        return (
          <img
            src="./icons/soccer-card.svg"
            alt="Arsenal"
            className="filter-red-600 size-6"
          />
        )
      case 'yellow-card':
        return (
          <img
            src="./icons/soccer-card.svg"
            alt="Arsenal"
            className="filter-yellow-500 size-6"
          />
        )
      case 'goal':
        return (
          <img src="./icons/football.svg" alt="Arsenal" className="size-6" />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center gap-0 space-y-0 bg-yellow-950">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-black/90"
          >
            View Match Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-2xl gap-0 space-y-0 rounded-xl border-0 bg-gradient-to-b from-gray-900 via-neutral-950 to-black p-0 text-white">
          {/* Header */}
          <div className="relative border-b border-white/10 p-4">
            <div className="absolute right-4 top-4 flex items-center gap-2"></div>
            <h2 className="text-center text-xl font-semibold">
              Premier League
            </h2>
            <div className="mt-1 text-center text-sm text-gray-400">
              Matchday 26 • Emirates Stadium
            </div>
          </div>

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
                <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
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

          <div className="h-full max-h-[calc(90vh-300px)] overflow-y-auto px-4">
            <div className="mb-4 text-center text-sm text-white/50">
              Конец матча.
            </div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transform bg-white/25"></div>

              {events.map((event, index) => (
                <div
                  key={index}
                  className={`my-4 flex items-center justify-center ${
                    event.stop
                      ? 'flex-col'
                      : event.team === 'home'
                        ? 'flex-row'
                        : 'flex-row-reverse'
                  }`}
                >
                  {event.stop ? (
                    <div className="z-10 bg-black px-2 text-center text-sm text-white/50">
                      {event.text}
                    </div>
                  ) : (
                    <>
                      <div
                        className={`w-5/12 ${
                          event.team === 'home'
                            ? 'pr-4 text-right'
                            : 'pl-4 text-left'
                        }`}
                      >
                        <div className="font-medium">{event.name}</div>
                        {event.subtext && (
                          <div className="text-sm text-white/50">
                            {event.subtext}
                          </div>
                        )}
                      </div>
                      <div className="flex w-2/12 items-center justify-center">
                        <div
                          className={`z-10 flex size-10 items-center justify-center rounded-full ${
                            event.goal
                              ? 'bg-[#00DC82]'
                              : event.yellowCard
                                ? 'bg-yellow-400'
                                : 'bg-gray-700'
                          }`}
                        >
                          {event.goal && <Goal className="size-6 text-white" />}
                          {event.yellowCard && (
                            <AlertTriangle className="size-6 text-white" />
                          )}
                        </div>
                      </div>
                      <div
                        className={`w-5/12 ${
                          event.team === 'home'
                            ? 'pl-4 text-left'
                            : 'pr-4 text-right'
                        }`}
                      >
                        <div className="text-sm text-white/70">
                          {event.time}`
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
