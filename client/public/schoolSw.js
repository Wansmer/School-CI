const CACHE = 'hw-cache-update-refresh';

const cacheData = [
  '/static/css', 
  '/static/media', 
  '/favicon.ico', 
  '/index.html'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(CACHE).then((cache) =>
          cache.addAll(cacheData))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fromCache(event.request));
  event.waitUntil(
    update(event.request)
    .then(refresh)
    .catch((error) => console.error('Failed from fetch: ', error))
  );
});

function fromCache(request) {
  return caches.open(CACHE).then((cache) =>
      cache.match(request).then((matching) =>
          matching || Promise.reject('no-match')
      ));
}

function update(request) {
  return caches.open(CACHE).then((cache) =>
      fetch(request).then((response) =>
          cache.put(request, response.clone()).then(() => response)
      )
  );
}

function refresh(response) {
  console.log('RESPONSE', response);
  return self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
          const message = {
              type: 'refresh',
              url: response.url,
              eTag: response.headers.get('ETag')
          };
          client.postMessage(JSON.stringify(message));
      });
  }).catch((error) => console.error('Error from refresh: ', error));
}
