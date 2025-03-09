'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, WifiOff, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function OfflinePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline events
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Check if user prefers dark mode
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const attemptReconnect = () => {
    // Attempt to reload the page
    window.location.reload()
  }

  return (
    <div
      className={cn(
        'flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-200',
        isDarkMode
          ? 'dark bg-gray-900 text-gray-100'
          : 'bg-gray-50 text-gray-900'
      )}
    >
      <div className="absolute right-4 top-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </div>

      <div className="mx-auto w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div
            className={cn(
              'rounded-full p-6',
              isDarkMode ? 'bg-gray-800' : 'bg-gray-200'
            )}
          >
            <WifiOff
              className={cn(
                'h-16 w-16',
                isOnline ? 'text-gray-400' : 'text-yellow-500'
              )}
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold">You&apos;re Offline</h1>

        <p className="text-lg opacity-80">
          It seems you&apos;ve lost your internet connection. Check your network
          and try again.
        </p>

        <div className="pt-4">
          <Button
            onClick={attemptReconnect}
            className={cn(
              'rounded-lg px-6 py-2 font-medium transition-all',
              isDarkMode
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            )}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>

        <div
          className={cn(
            'mt-8 border-t pt-8 text-sm opacity-60',
            isDarkMode ? 'border-gray-700' : 'border-gray-300'
          )}
        >
          <p>
            This page is cached and available offline. Some features may be
            limited until you&apos;re back online.
          </p>
        </div>
      </div>
    </div>
  )
}
