'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Share2, X, Goal, AlertTriangle } from 'lucide-react'

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-black/90"
          >
            View Match Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] max-w-2xl border-0 bg-black p-0 text-white">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            {/* <button className="rounded-full p-1 hover:bg-white/10">
              <ArrowLeft className="h-6 w-6" />
            </button> */}
            <div className="text-center">
              <div className="text-sm">Арсенал vs</div>
              <div className="text-sm">Манчестер Сити</div>
            </div>
            {/* <button className="rounded-full p-1 hover:bg-white/10">
              <Share2 className="h-6 w-6" />
            </button> */}
          </div>

          {/* Score */}
          <div className="flex items-center justify-center gap-4 py-6">
            <img
              src="../static/club-jpeg/arsenal/logo.jpeg"
              alt="Arsenal"
              width={40}
              height={40}
              className="size-12 rounded"
            />
            <div className="flex items-baseline gap-3 text-4xl font-light">
              <span>5</span>
              <span className="text-white/50">:</span>
              <span>1</span>
            </div>
            <img
              src="../static/club-jpeg/manchester-city/logo.jpeg"
              alt="Manchester City"
              width={40}
              height={40}
              className="size-12 rounded"
            />
          </div>

          {/* Timeline */}
          <div className="max-h-[calc(90vh-300px)] overflow-y-auto px-4">
            <div className="mb-4 text-center text-sm text-white/50">
              Конец матча.
            </div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 transform bg-white/20"></div>

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

          {/* Bottom Vote Section */}
          {/* <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black p-4">
            <div className="flex justify-between gap-4">
              <button className="flex-1 rounded-full border border-white/10 py-3 text-sm">
                ВЫБЕРИ ЛУЧШЕГО ИГРОКА
              </button>
              <button className="flex-1 rounded-full border border-white/10 py-3 text-sm">
                ВЫБЕРИ ХУДШЕГО ИГРОКА
              </button>
              <button className="rounded-full border border-white/10 p-3">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div> */}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
