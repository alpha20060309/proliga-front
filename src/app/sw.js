import { Serwist, NetworkOnly, BackgroundSyncQueue, ExpirationPlugin, StaleWhileRevalidate, CacheableResponsePlugin } from 'serwist'
import { defaultCache } from '@serwist/next/worker'


const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    concurrency: 30,
  },
  runtimeCaching: [
    ...defaultCache,
    {
      handler: new NetworkOnly({
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 60 * 60, // 1 hour
          }),
        ],
      }),
      method: 'POST',
      matcher: ({ request }) => request.method === 'POST',
    },
    {
      handler: new NetworkOnly({
        plugins: [
          new ExpirationPlugin({
            maxEntries: 32,
            maxAgeSeconds: 60 * 60, // 1 hour
          }),
        ],
      }),
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

self.addEventListener('fetch', (event) => {
  if (event?.request?.method === 'POST' || event?.request?.method === 'PATCH') {
    event.respondWith(backgroundSync(event))
  }
})

const urlsToPrecache = ["/", '/uz', '/ru', "/uz/~offline", '/ru/~offline'];

self.addEventListener("install", (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({ request: new Request(entry), event });
    }),
  );

  event.waitUntil(requestPromises);
});

addEventListener('fetch', (event) => {
  const { request } = event;

  // Always bypass for range requests, due to browser bugs
  if (request.headers.has('range')) return;
  event.respondWith(async function () {
    // Try to get from the cache:
    const cachedResponse = await caches.match(request);
    if (cachedResponse) return cachedResponse;

    try {
      // Otherwise, get from the network
      return await fetch(request);
    } catch (err) {
      // If this was a navigation, show the offline page:
      if (request.mode === 'navigate') {
        return caches.match('/uz/~offline');
      }

      // Otherwise throw
      throw err;
    }
  }());
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.map(cacheName =>
          caches.open(cacheName).then(cache =>
            cache.keys().then(requests =>
              Promise.all(
                requests.map(req =>
                  cache.match(req).then(res => {
                    if (res && res.status >= 300 && res.status < 400) {
                      return cache.delete(req);
                    }
                  })
                )
              )
            )
          )
        )
      )
    )
  );
});

serwist.addEventListeners()