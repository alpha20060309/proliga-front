import { Serwist, NetworkOnly, BackgroundSyncQueue, ExpirationPlugin, StaleWhileRevalidate, CacheableResponsePlugin } from 'serwist'
import { defaultCache } from '@serwist/next/worker'


const urlsToPrecache = ["/", '/uz', '/ru', "/uz/~offline", '/ru/~offline'];
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


self.addEventListener("install", (event) => {
  const requestPromises = Promise.all(
    urlsToPrecache.map((entry) => {
      return serwist.handleRequest({ request: new Request(entry), event });
    }),
  );

  event.waitUntil(requestPromises);
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 1. Range requests → bypass
  if (request.headers.has('range')) return;

  // 2. Background sync for POST/PATCH
  if (request.method === 'POST' || request.method === 'PATCH') {
    return event.respondWith(backgroundSync(event));
  }

  // 3. Attempt normal Serwist/Workbox handling
  event.respondWith(
    (async () => {
      try {
        // Attempt normal Serwist logic (runtimeCaching, precache, etc.)
        const response = await serwist.handleRequest({ request, event });

        // 4. Log redirects (for debug)
        if (response?.status >= 300 && response.status < 400) {
          console.warn('[SW] Intercepted a redirect:', request.url, response.status);
        }

        if (response) return response;
      } catch (err) {
        console.error('[SW] Error handling request via Serwist:', err);
      }

      // 5. Fallback: try network
      try {
        return await fetch(request);
      } catch (err) {
        // 6. If it's a navigation, show offline fallback
        if (request.mode === 'navigate') {
          return caches.match('/uz/~offline');
        }
        throw err;
      }
    })()
  );
});

// addEventListener('fetch', (event) => {
//   const { request } = event;

//   // Always bypass for range requests, due to browser bugs
//   if (request.headers.has('range')) return;
//   event.respondWith(async function () {
//     // Try to get from the cache:
//     const cachedResponse = await caches.match(request);
//     if (cachedResponse) return cachedResponse;

//     try {
//       // Otherwise, get from the network
//       return await fetch(request);
//     } catch (err) {
//       // If this was a navigation, show the offline page:
//       if (request.mode === 'navigate') {
//         return caches.match('/uz/~offline');
//       }

//       // Otherwise throw
//       throw err;
//     }
//   }());
// });

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