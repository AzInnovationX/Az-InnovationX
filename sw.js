const CACHE_NAME = 'az-innx-v2.0.3';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/servicios.html',
  '/proceso.html',
  '/nosotros.html',
  '/certificaciones.html',
  '/precios.html',
  '/pagar.html',
  '/contacto.html',
  '/css/style.css?v=1.0.2',
  '/js/main.js?v=1.0.2',
  '/js/firebase-config.js?v=1.0.2',
  '/favicon.ico'
];

// Install: Cache essential assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Network-First for HTML/Navigation requests to ensure immediate updates
  if (event.request.mode === 'navigate' || url.pathname.endsWith('.html') || (!url.pathname.includes('.') && !url.pathname.startsWith('/js/') && !url.pathname.startsWith('/css/'))) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        return caches.match(event.request);
      })
    );
    return;
  }

  // Stale-While-Revalidate for other assets
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      });
    })
  );
});
