/*
* Code adapted from
* Udacity's course Offline Web Applications by Google,
* Michael Wales and Jake Archibald instructors:
* https://www.udacity.com/course/offline-web-applications--ud899
* and
* MSDN service worker example on 6/25/2018:
* https://developers.google.com/web/fundamentals/primers/service-workers/
*/

var currentCacheName = 'restaurantProject-v01';

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

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
//      var fetchRequest = event.request.clone();
//
//      return fetch(fetchRequest).then(
//        function (response) {
//          if (!response || response.status !== 200 || response.type !== 'basic') {
//            return response;
//          }
//
//          var responseToCache = response.clone();
//
//          caches.open(currentCacheName)
//            .then(function (cache) {
//              cache.put(event.request, responseToCache);
//            });
//
//          return response;
//        }
//      );
//})
//);
//});
