import { Serwist, NetworkOnly, BackgroundSyncQueue } from 'serwist'
import { defaultCache } from '@serwist/next/worker'

const locale = 'uz'

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
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
  ],
  skipWaiting: true,
  clientsClaim: true,
  offlineAnalyticsConfig: true,
  importScripts: ['/firebase-messaging-sw.js'],
  fallbacks: {
    entries: [
      {
        url: `/${locale}/offline`,
        matcher({ request }) {
          return request.destination === 'document'
        },
      },
    ],
  },
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

self.addEventListener('fetch', (event) => {
  if (event?.request?.method === 'POST' || event?.request?.method === 'PATCH') {
    event.respondWith(backgroundSync(event))
  }
})

serwist.addEventListeners()