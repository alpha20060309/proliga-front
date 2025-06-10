import { Serwist, NetworkFirst, BackgroundSyncQueue, ExpirationPlugin } from 'serwist'
import { defaultCache, PAGES_CACHE_NAME } from '@serwist/next/worker'

const matchOptions = {
  ignoreSearch: true,
}


const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    concurrency: 30,
  },
  runtimeCaching: [
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get("RSC") === "1" && request.headers.get("Next-Router-Prefetch") === "1" && sameOrigin && !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE_NAME.rscPrefetch,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        matchOptions,
      }),
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) => request.headers.get("RSC") === "1" && sameOrigin && !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE_NAME.rsc,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        matchOptions,
      }),
    },
    {
      matcher: ({ request, url: { pathname }, sameOrigin }) =>
        request.headers.get("Content-Type")?.includes("text/html") && sameOrigin && !pathname.startsWith("/api/"),
      handler: new NetworkFirst({
        cacheName: PAGES_CACHE_NAME.html,
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          }),
        ],
        matchOptions,
      }),
    },
    ...defaultCache,
    {
      handler: new NetworkFirst(),
      method: 'POST',
      matcher: ({ request }) => request.method === 'POST',
    },
    {
      handler: new NetworkFirst(),
      method: 'PATCH',
      matcher: ({ request }) => request.method === 'PATCH',
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
  offlineAnalyticsConfig: true,
  disableDevLogs: true,
  importScripts: ['/firebase-messaging-sw.js'],
  fallbacks: {
    entries: [
      {
        url: "/~offline",
        matcher({ request }) {
          return request.destination === "document";
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

const urlsToPrecache = ["/", '/uz', '/ru', "/~offline"];

self.addEventListener("install", (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({ request: new Request(entry), event });
    }),
  );

  event.waitUntil(requestPromises);
});
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//       Promise.all(
//           urlsToCache.map((entry) => {
//               const request = serwist.handleRequest({
//                   request: new Request(entry),
//                   event,
//               })
//               return request
//           }),
//       ),
//   )
// })

serwist.addEventListeners()