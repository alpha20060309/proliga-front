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
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="bg-card border-error w-full max-w-md border-4">
        <div className="p-6 text-center">
          <h1 className="text-error mb-4 text-6xl font-bold">500</h1>
          <div className="relative mx-auto mb-6 h-24 w-24">
            <div className="bg-error absolute inset-0 rounded-full"></div>
            <div className="bg-background absolute inset-2 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-error text-2xl font-bold">STOP</span>
            </div>
          </div>
          <h2 className="text-error mb-4 text-2xl font-semibold">
            O&apos;yinda texnik to&apos;xtash!
          </h2>
          <p className="text-muted-foreground mb-6">
            Afsuski, serverda xatolik yuz berdi. Jamoamiz bu muammoni hal qilish
            ustida ishlamoqda.
          </p>
          <div className="space-y-2">
            <Button
              onClick={reset}
              className="bg-error text-foreground hover:bg-error/80 w-full"
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
