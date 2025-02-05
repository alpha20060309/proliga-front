'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Trophy, Timer, Share2, X } from 'lucide-react'

function Timeline() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white hover:from-blue-700 hover:to-blue-900"
          >
            View Match Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl rounded-xl border-0 bg-gradient-to-b from-gray-900 to-black p-0 text-white">
          {/* Header */}
          <div className="relative border-b border-white/10 p-4">
            <div className="absolute right-4 top-4 flex items-center gap-2">
              {/* <button className="rounded-full p-2 hover:bg-white/10">
                <Share2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button> */}
            </div>
            <h2 className="text-center text-xl font-semibold">
              Premier League
            </h2>
            <div className="mt-1 text-center text-sm text-gray-400">
              Matchday 26 • Emirates Stadium
            </div>
          </div>

          {/* Score Section */}
          <div className="bg-gradient-to-r from-blue-900/20 via-blue-800/20 to-blue-900/20 p-6">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <img
                  src="../static/club-jpeg/arsenal/logo.jpeg"
                  alt="Arsenal"
                  className="mx-auto h-16 w-16 rounded-full object-cover"
                />
                <div className="mt-2 font-semibold">Arsenal</div>
              </div>
              <div className="text-center">
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-4xl font-bold">2</span>
                  <span className="text-4xl font-light text-gray-400">:</span>
                  <span className="text-4xl font-bold">1</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                  <Timer className="h-4 w-4" />
                  <span>90`+4</span>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="../static/club-jpeg/manchester-city/logo.jpeg"
                  alt="Manchester City"
                  className="mx-auto h-16 w-16 rounded-full object-cover"
                />
                <div className="mt-2 font-semibold">Man City</div>
              </div>
            </div>
          </div>

          {/* Match Stats */}
          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between">
              <div className="w-[45%]">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <span className="text-sm font-medium">Possession</span>
              <div className="w-[45%]">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '35%', marginLeft: 'auto' }}
                ></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="w-[45%]">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '80%' }}
                ></div>
              </div>
              <span className="text-sm font-medium">Shots</span>
              <div className="w-[45%]">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: '20%', marginLeft: 'auto' }}
                ></div>
              </div>
            </div>
          </div>

          {/* Match Events */}
          <div className="max-h-[300px] overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-medium">Saka 90`+2</div>
                  <div className="text-sm text-gray-400">Goal - Arsenal</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-medium">Haaland 75`</div>
                  <div className="text-sm text-gray-400">Goal - Man City</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-medium">Martinelli 23`</div>
                  <div className="text-sm text-gray-400">Goal - Arsenal</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900">
              View Full Match Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Timeline
