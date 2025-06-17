'use client'
import { useEffect } from 'react'

export const onLocaleSwitch = (locale) => {
  if ('serviceWorker' in navigator && window.serwist) {
    // Get a bunch of URLs to cache.
    const urlsToCache = []
    // Send that list of URLs to your router in the service worker.
    window.serwist.messageSW({
      type: 'CACHE_URLS',
      payload: { urlsToCache },
    })
  }
}

export const Pwa = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator && window.serwist) {
      window.serwist.addEventListener('activated', (event) => {
        // Get a bunch of URLs to cache. Use the current locale to
        // avoid caching URLs in locales that the user will never use.
        const urlsToCache = []
        // Send that list of URLs to your router in the service worker.
        window.serwist.messageSW({
          type: 'CACHE_URLS',
          payload: { urlsToCache },
        })
      })
      void window.serwist.register()
    }
  }, [])

  return <></>
}
