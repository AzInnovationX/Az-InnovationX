const CACHE_NAME = 'az-innx-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/base.css',
  '/css/header.css',
  '/css/hero.css',
  '/css/sections.css',
  '/css/contact.css',
  '/css/chatbot.css',
  '/css/footer.css',
  '/js/main.js',
  '/js/video.js',
  '/js/chatbot.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
