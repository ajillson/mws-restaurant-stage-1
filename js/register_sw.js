/*
* Code adapted from MSDN example on 6/25/2018:
* https://developers.google.com/web/fundamentals/primers/service-workers/
* and Udacity's course Offline Web Applications by Google,
* Michael Wales and Jake Archibald instructors
* https://www.udacity.com/course/offline-web-applications--ud899

* Register the Service Worker
*/
if ('serviceWorker' in navigator) {
  // registers service worker after page loads
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (reg) {
        // registration worked
        console.log('Registration succeeded. Scope is ' + reg.scope);
      }).catch(function (error) {
        // registration failed
        console.log('Registration failed with ' + error);
      });
  });
}
