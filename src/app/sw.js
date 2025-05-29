import { Serwist, NetworkOnly, BackgroundSyncQueue } from 'serwist'
import { defaultCache } from '@serwist/next/worker' // Temporarily comment out if not essential for basic install test

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
  },
  runtimeCaching: [ // Temporarily comment out
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
  ],
  skipWaiting: true,
  clientsClaim: true,
  // offlineAnalyticsConfig: true, // Temporarily comment out for production troubleshooting
  importScripts: ['/firebase-messaging-sw.js'], // Temporarily comment out
  fallbacks: { // Temporarily comment out
    entries: [
      {
        url: '/offline',
        matcher({ request }) {
          return request.destination === 'document'
        },
      },
    ],
  },
})

const queue = new BackgroundSyncQueue('sync-queue') // Temporarily comment out
const backgroundSync = async (event) => { // Temporarily comment out
  try {
    const response = await fetch(event.request.clone())
    return response
  } catch (error) {
    await queue.pushRequest({ request: event.request })
    return Response.error()
  }
}

self.addEventListener('fetch', (event) => { // Temporarily comment out
  if (event?.request?.method === 'POST' || event?.request?.method === 'PATCH') {
    event.respondWith(backgroundSync(event))
  }
})

serwist.addEventListeners()