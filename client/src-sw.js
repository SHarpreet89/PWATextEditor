// Import Workbox modules
import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

// Set the maximum file size to cache (increase to 10 MB)
self.__WB_MAX_FILE_SIZE_TO_CACHE_IN_BYTES = 10 * 1024 * 1024; // 10 MB

// Precache the assets
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for page requests
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
    }),
  ],
});

// Precache specific URLs to ensure they are available offline
const warmUrls = ['/index.html', '/'];
warmStrategyCache({
  urls: warmUrls,
  strategy: pageCache,
});

// Register route for navigation requests (HTML pages)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  pageCache
);

// Register route for caching styles, scripts, and workers
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
 