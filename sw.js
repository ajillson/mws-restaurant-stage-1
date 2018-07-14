/*
 * Code adapted from
 * Udacity's course Offline Web Applications by Google,
 * Michael Wales and Jake Archibald instructors:
 * https://www.udacity.com/course/offline-web-applications--ud899
 * and
 * pulled from Google's Web Fundamentals, Service Workers: an Introduction,
 * by Matt Gaunt
 * on 6/25/2018:
 * https://developers.google.com/web/fundamentals/primers/service-workers/
 */

var currentCacheName = 'restaurantProject-v04';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(currentCacheName).then(function (cache) {
      return cache.addAll([
        '/',
        'index.html',
        'restaurant.html',
        'css/styles.css',
        'data/restaurants.json',
        'js/',
        'js/dbhelper.js',
        'js/main.js',
        'js/register_sw.js',
        'js/restaurant_info.js'
      ]).catch(function (error) {
        console.log('Caches open failed: ' + error);
      });
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurantProject-') &&
            cacheName != currentCacheName;
        }).map(function (cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

      // Code from https://developers.google.com/web/fundamentals/primers/service-workers/
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // IMPORTANT: Clone the request. A request is a stream and
      // can only be consumed once. Since we are consuming this
      // once by cache and once by the browser for fetch, we need
      // to clone the response.
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function (response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // IMPORTANT: Clone the response. A response is a stream
          // and because we want the browser to consume the response
          // as well as the cache consuming the response, we need
          // to clone it so we have two streams.
          var responseToCache = response.clone();

          caches.open(currentCacheName)
            .then(function (cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        }
      );
    })
  );
});
