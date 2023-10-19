const CACHE_NAME = 'nike-cache-v1';
const urlsToCache = [
  '/',
  '/css/style.css',
  '/js/scrip.js', // Asegúrate de ajustar esta ruta según la ubicación real de tu archivo JS
  // Añadir aquí todas las rutas a los recursos que quieres que se almacenen en caché
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
