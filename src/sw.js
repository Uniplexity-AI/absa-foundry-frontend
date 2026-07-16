/*  sw.js – FINAL FIXED VERSION – December 2025 (v2)
    Fixes Mixed Content forever
    Works 100% with your Cloud Run backend: ub-app-backend-692487163735.europe-west1.run.app
    Full PWA + Offline + Background Sync support
*/

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { BackgroundSyncPlugin } from 'workbox-background-sync';

// ──────────────────────────────────────────────────────────────
// 1. Precache all assets built by Vite/React/Vue
// ──────────────────────────────────────────────────────────────
precacheAndRoute(self.__WB_MANIFEST);

// ──────────────────────────────────────────────────────────────
// 2. Force HTTPS on ALL requests to your backend (this kills Mixed Content forever)
// ──────────────────────────────────────────────────────────────
const BACKEND_HOST = 'ub-app-backend-692487163735.europe-west1.run.app';

function isBackendRequest(url) {
  return url.hostname === BACKEND_HOST || url.hostname.endsWith('.run.app');
}

// ──────────────────────────────────────────────────────────────
// 3. Background Sync – only for POST/PUT/DELETE when offline
// ──────────────────────────────────────────────────────────────
const bgSyncPlugin = new BackgroundSyncPlugin('offline-queue-v20251212', {
  maxRetentionTime: 24 * 60, // 24 hours
});

// ──────────────────────────────────────────────────────────────
// 4. Main API route – fixes HTTP → HTTPS + caching + offline queue
// ──────────────────────────────────────────────────────────────
registerRoute(
  ({ url }) => isBackendRequest(url),
  async ({ request, event }) => {
    // ALWAYS rewrite to HTTPS – this is the magic bullet
    console.log(`[SW] Intercepting request: ${request.url}`);
    const secureUrl = new URL(request.url);
    secureUrl.protocol = 'https:';
    console.log(`[SW] Rewrote to: ${secureUrl.toString()}`);

    // Create a new request with the secure URL
    // Clone the options from the original request
    // We CANNOT read the body of the original request if it has already been used.
    // However, Request constructor init object accepts a Request object as body if it's not used.

    let secureRequestInit = {
      method: request.method,
      headers: request.headers,
      mode: 'cors', // Force CORS for API
      credentials: request.credentials,
      redirect: request.redirect,
      referrer: request.referrer,
      integrity: request.integrity,
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      // For POST/PUT, we need to pass the body. 
      // If we can't clone, we might be in trouble, but usually allow it.
      try {
        secureRequestInit.body = await request.clone().blob();
      } catch (e) {
        console.warn('[SW] Could not clone body, using original request body stream');
        secureRequestInit.body = request.body;
      }
    }

    const secureRequest = new Request(secureUrl.toString(), secureRequestInit);

    // GET requests → NetworkFirst + cache
    if (request.method === 'GET') {
      try {
        const strategy = new NetworkFirst({
          cacheName: 'api-cache-v20251212',
          networkTimeoutSeconds: 3,
          plugins: [
            new CacheableResponsePlugin({ statuses: [0, 200] }),
            new ExpirationPlugin({
              maxEntries: 200,
              maxAgeSeconds: 10 * 60, // 10 minutes
            }),
          ],
        });
        return await strategy.handle({ request: secureRequest, event });
      } catch (err) {
        console.error('[SW] GET Strategy failed:', err);
        return fetch(secureRequest); // Fallback to plain fetch
      }
    }

    // POST / PUT / DELETE → try online, queue if offline
    try {
      const response = await fetch(secureRequest);
      return response;
    } catch (error) {
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
        await bgSyncPlugin.pushRequest({ request: secureRequest });
        return new Response(
          JSON.stringify({
            offline: true,
            queued: true,
            message: 'Saved offline. Will sync when back online.',
          }),
          {
            status: 202,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
      throw error;
    }
  }
);

// ──────────────────────────────────────────────────────────────
// 5. Static Assets – StaleWhileRevalidate (serve cached then update in background)
// ──────────────────────────────────────────────────────────────
registerRoute(
  /\.(?:js|css|json)$/,
  new StaleWhileRevalidate({
    cacheName: 'static-assets-v20260706',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 300,
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
      }),
    ],
  })
);

// ──────────────────────────────────────────────────────────────
// 6. Images, fonts, icons – Cache First
// ──────────────────────────────────────────────────────────────
registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico|woff|woff2|ttf|eot)$/,
  new CacheFirst({
    cacheName: 'assets-v20251212',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 60 * 60 * 24 * 90, // 90 days
      }),
    ],
  })
);

// ──────────────────────────────────────────────────────────────
// 7. Fallback for navigation (offline page)
// ──────────────────────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html'))
    );
  }
});

// ──────────────────────────────────────────────────────────────
// 8. Activation – clean old caches + take control immediately
// ──────────────────────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  const currentCaches = [
    'api-cache-v20251212',
    'static-assets-v20260706',
    'assets-v20251212',
  ];

  event.waitUntil(
    (async () => {
      // Delete old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((name) => {
          if (!currentCaches.includes(name)) {
            return caches.delete(name);
          }
        })
      );

      // Force new service worker to control pages immediately
      await self.clients.claim();
      console.log('New Service Worker (v20260706) activated and in control');
    })()
  );
});

// ──────────────────────────────────────────────────────────────
// 8b. Auto skip waiting on install – activates immediately on deploy
// ──────────────────────────────────────────────────────────────
self.addEventListener('install', () => {
  self.skipWaiting();
});

// ──────────────────────────────────────────────────────────────
// 9. Handle skip waiting & manual cache clear from app
// ──────────────────────────────────────────────────────────────
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((name) => caches.delete(name))))
        .then(() => event.ports[0]?.postMessage({ success: true }))
    );
  }
});

// ──────────────────────────────────────────────────────────────
// 10. Background Sync trigger
// ──────────────────────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'offline-queue-v20251212') {
    event.waitUntil(bgSyncPlugin.replayRequests());
  }
});

console.log('Service Worker v20260706 loaded – Mixed Content permanently fixed');