var CACHE_NAME = "cache-v1";
var urlsToCache = [
  "/",
  "/node_modules/angular/angular.min.js",
  "/node_modules/angular-resource/angular-resource.min.js",
  "/node_modules/angular-route/angular-route.min.js",
  "/node_modules/angular-resource/angular-resource.min.js",
  "https://fonts.googleapis.com/css?family=Roboto",
  "http://netdna.bootstrapcdn.com/twitter-bootstrap/2.0.4/css/bootstrap-combined.min.css",
  "app/views/list.html",
  "app/script/controllers/project-list-controller.js",
  "app/script/service/project-service.js",
  "app/script/data/project-list.js",
  "app/script/app.js"
];

self.addEventListener("install", function (event) {
  console.log('[ServiceWorker] installed');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('[ServiceWorker] Caching cached files');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] Activated');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(cacheNames.map(function (thisCacheName) {
        if (thisCacheName !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing Cached files from', thisCacheName);
          return caches.delete(thisCacheName);
        }
      }));
    })
  )
});

self.addEventListener("fetch", function (event) {
  // console.log('[ServiceWorker] Fetching', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      // Clone Request :
      // Request is a stream and can only be consumed once,
      // since we are using this once by cache and once by the browser for fetch,
      // we need to clone the response.
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function (response) {
        // check for valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          console.log('[ServiceWorker] Found in cache', event.request.url);
          return response;
        }
        // IMPORTANT: Clone the response. A response is a stream
        // and because we want the browser to consume the response
        // as well as the cache consuming the response, we need
        // to clone it so we have two streams.
        var responseToCache = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseToCache);
        });
        return response;
      }).catch(function (err) { 
        console.log('[ServiceWorker] Error');
      });
    })
  );
});
