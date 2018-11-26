importScripts("precache-manifest.3593563400aedf4f1ec2ad7d80c25400.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
// eslint-disable-next-line no-undef

if (self.workbox) {
  self.workbox.precaching.precache(self.__precacheManifest)

  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request)
      })
    )
  })
}

