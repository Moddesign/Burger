const CACHE_NAME = 'burger-menu-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // Falls du separate CSS/JS Dateien hast, hier ergänzen, z.B.:
  // './styles.css',
  // './script.js',
];

// Installationsphase: Dateien zwischenspeichern
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Aktivierung: alte Caches löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    )
  );
});

// Bei Netzwerk-Anfragen: Cache zuerst, dann Netzwerk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
