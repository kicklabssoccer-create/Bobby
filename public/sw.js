// Kicklab Service Worker — PWA offline support
const CACHE_NAME = 'kicklab-v1';
const STATIC_CACHE = 'kicklab-static-v1';

// Core pages to cache for offline
const PRECACHE_URLS = [
  '/',
  '/drills',
  '/videos',
  '/programs',
  '/pricing',
  '/products',
  '/dashboard',
  '/auth/login',
  '/auth/signup',
];

// Install: precache core pages
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // Silently fail — pages may not all be reachable during install
      });
    })
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== STATIC_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API, cache-first for pages
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (CDN, YouTube, etc.)
  if (url.origin !== self.location.origin) return;

  // Skip admin routes — always fetch live
  if (url.pathname.startsWith('/admin')) return;

  // API routes: network-only, never cache
  if (url.pathname.startsWith('/api/')) return;

  // HTML pages: network-first, fall back to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful HTML responses
        if (response && response.status === 200 && request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => {
        // Offline: serve from cache
        return caches.match(request).then((cached) => {
          if (cached) return cached;
          // Fallback to homepage if page not cached
          return caches.match('/');
        });
      })
  );
});

// Push notification support (future use)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title || 'Kicklab', {
      body: data.body || 'Time to train! ⚽',
      icon: '/static/icons/icon-192.png',
      badge: '/static/icons/icon-96.png',
      vibrate: [200, 100, 200],
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
