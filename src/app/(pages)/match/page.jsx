'use client'

import { ArrowLeft, MoreHorizontal, Share2, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function MatchDetails() {
  const [activeTab, setActiveTab] = useState('online')

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-sm">
        <div>17:59</div>
        <div className="flex items-center gap-2">
          <MoreHorizontal className="h-4 w-4" />
          <div className="h-4 w-4 rounded-full border border-white/30"></div>
          <div>25%</div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button className="rounded-full p-1 hover:bg-white/10">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div className="text-center">
          <div className="text-sm">Арсенал vs</div>
          <div className="text-sm">Манчестер Сити</div>
        </div>
        <button className="rounded-full p-1 hover:bg-white/10">
          <Share2 className="h-6 w-6" />
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <nav className="flex">
          {['Онлайн', 'Чат', 'Составы', 'Турнир', 'Статистика'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`flex-1 border-b-2 px-3 py-2 text-sm transition-colors ${
                activeTab === tab.toLowerCase()
                  ? 'border-[#00DC82] text-[#00DC82]'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Score */}
      <div className="flex items-center justify-center gap-4 py-6">
        {/* <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-02-03_17-59-25.jpg-1228fF31YvdR2Uz1iWqoWY5yMjo6gQ.jpeg"
          alt="Arsenal"
          width={40}
          height={40}
          className="h-8 w-8"
        /> */}
        <div className="flex items-baseline gap-3 text-4xl font-light">
          <span>5</span>
          <span className="text-white/50">:</span>
          <span>1</span>
        </div>
        {/* <Image
          // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2025-02-03_17-59-25.jpg-1228fF31YvdR2Uz1iWqoWY5yMjo6gQ.jpeg"
          alt="Manchester City"
          width={40}
          height={40}
          className="h-8 w-8"
        /> */}
      </div>

      {/* Timeline */}
      <div className="space-y-4 px-4">
        <div className="text-center text-sm text-white/50">Конец матча.</div>

        {/* Timeline Events */}
        <div className="space-y-3">
          {[
            { name: 'Калафьори', subtext: 'Льюис-Скелли', rating: 90 },
            { name: 'Стерлинг', subtext: 'Хавертц', rating: 90 },
            { name: 'Мерино', subtext: 'Эдегор', rating: 84, goal: true },
            { name: 'Нванери', subtext: 'Троссард', rating: 84 },
            { name: 'Хавертц', subtext: 'Мартинелли', rating: 76, goal: true },
          ].map((player, i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-white/50">{player.subtext}</div>
              </div>
              <div className="flex items-center gap-2">
                {player.goal && (
                  <div className="rounded bg-[#00DC82] p-1">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                )}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900">
                  {player.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Vote Section */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black p-4">
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
      </div>
    </div>
  )
}
