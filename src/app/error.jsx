'use client'

import './globals.css'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useEffect } from 'react'

export default function Error({ reset }) {
  const router = useTransitionRouter()

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof navigator === 'undefined' ||
      !router
    ) {
      console.warn(
        'Required objects (window, navigator, or router) are not available'
      )
      return
    }

    const handleOffline = () => {
      if (typeof navigator.onLine === 'undefined') {
        console.warn('navigator.onLine is not available')
        return
      }

      if (!navigator.onLine) {
        router.push('/offline')
      }
    }

    handleOffline()

    window.addEventListener('online', handleOffline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOffline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 p-4">
      <Card className="bg-card w-full max-w-md border-4 border-red-500">
        <div className="p-6 text-center">
          <h1 className="mb-4 text-6xl font-bold text-red-500">500</h1>
          <div className="relative mx-auto mb-6 h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-red-500"></div>
            <div className="absolute inset-2 rounded-full bg-gray-800"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-500">STOP</span>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-red-400">
            O&apos;yinda texnik to&apos;xtash!
          </h2>
          <p className="mb-6 text-neutral-300">
            Afsuski, serverda xatolik yuz berdi. Jamoamiz bu muammoni hal qilish
            ustida ishlamoqda.
          </p>
          <div className="space-y-2">
            <Button
              onClick={reset}
              className="w-full bg-red-500 text-neutral-900 hover:bg-red-600"
            >
              Qayta urinish
            </Button>
            <Link href="/">Asosiy maydonga qaytish</Link>
          </div>
        </div>
      </Card>
    </div>
  )
}
