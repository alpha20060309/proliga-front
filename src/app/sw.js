import {
  Serwist,
  NetworkOnly,
  BackgroundSyncQueue,
  ExpirationPlugin,
  StaleWhileRevalidate,
  CacheableResponsePlugin,
} from 'serwist'
import { defaultCache } from '@serwist/next/worker'

const urlsToPrecache = ['/', '/uz', '/ru', '/uz/~offline', '/ru/~offline']
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    concurrency: 30,
    matchOptions: {
      ignoreSearch: true
    }
  },

  runtimeCaching: [
    ...defaultCache,
    {
      handler: new NetworkOnly(),
      method: 'POST',
      matcher: ({ request }) => request.method === 'POST',
    },
    {
      handler: new NetworkOnly(),
      method: 'PATCH',
      matcher: ({ request }) => request.method === 'PATCH',
    },
    {
      matcher: ({ request }) => request.destination === 'document',
      handler: new StaleWhileRevalidate({
        plugins: [
          new CacheableResponsePlugin({ statuses: [200] }),
          new ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 10 day
          }),
        ],
      }),
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
  offlineAnalyticsConfig: true,
  disableDevLogs: true,
  importScripts: ['/firebase-messaging-sw.js'],
})

const queue = new BackgroundSyncQueue('sync-queue')
const backgroundSync = async (event) => {
  try {
    const response = await fetch(event.request.clone())
    return response
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    await queue.pushRequest({ request: event.request })
    return Response.error()
  }
}

self.addEventListener('install', (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({ request: new Request(entry), event })
    })
  )

  event.waitUntil(requestPromises)
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // 1. Range requests → bypass
  if (request.headers.has('range')) return

  // 2. Background sync for POST/PATCH
  if (request.method === 'POST' || request.method === 'PATCH') {
    return event.respondWith(backgroundSync(event))
  }

  // 3. Attempt normal Serwist/Workbox handling
  event.respondWith(
    serwist.handleRequest({ request, event }).catch(async () => {
      if (request.mode === 'navigate') {
        const url = new URL(request.url)
        const locale = url.pathname.split('/')[1]
        const fallback = await caches.match(`/${locale}/~offline`)
        return fallback || caches.match('/uz/~offline')
      }
      return Response.error()
    })
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.registration.navigationPreload?.enable());
});

serwist.addEventListeners()
