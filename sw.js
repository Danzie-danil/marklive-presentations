/*
 * MarkLive Presentations — service worker
 *
 * Fetch strategy:
 *  - HTML/navigation requests: network-first, falling back to the cache
 *    only when offline. This is what makes a new GitHub Pages deploy show
 *    up automatically next time the app is opened with a connection,
 *    instead of forever serving whatever was cached at install time.
 *  - Everything else (manifest, icons): cache-first with a background
 *    revalidate, so the app stays fast and fully usable offline.
 *
 * Releasing an update: bump SW_VERSION below. Changing this file's bytes
 * is what makes browsers notice a new service worker exists at all and
 * install it — that, in turn, rotates the offline cache. Keep it in sync
 * with CHANGELOG[0].version in index.html.
 */
var SW_VERSION = '1.1.0';
var CACHE_NAME = 'marklive-v' + SW_VERSION;
var APP_SHELL = [
  'index.html',
  'manifest.json',
  'sw.js',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(APP_SHELL);
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  var accept = event.request.headers.get('accept') || '';
  var isNavigation = event.request.mode === 'navigate' || accept.indexOf('text/html') !== -1;

  if (isNavigation) {
    /* Network-first: always try to fetch the latest index.html when
       online, so updates are visible without reinstalling the app.
       Only fall back to the cached copy when there's no connection. */
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          var toCache = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, toCache); });
        }
        return response;
      }).catch(function() {
        return caches.match(event.request).then(function(cached) {
          return cached || caches.match('index.html');
        });
      })
    );
    return;
  }

  /* Cache-first + background revalidate for static shell assets —
     instant from cache, but quietly refreshed for next time. */
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      var network = fetch(event.request).then(function(response) {
        if (response && response.status === 200 && response.type !== 'opaque') {
          var toCache = response.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, toCache); });
        }
        return response;
      }).catch(function() { return cached; });
      return cached || network;
    })
  );
});
