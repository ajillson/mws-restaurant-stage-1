/*
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
