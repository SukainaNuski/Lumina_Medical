self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('v1').then(cache => {
        return cache.addAll([
            '/LuminaMedical/',  // Update this path
            '/LuminaMedical/index.html',  // Update this path
            '/LuminaMedical/styles/style.css',  // Update this path
            '/LuminaMedicall/scripts/script.js',  // Update this path
            '/LuminaMedical/Favicons/favicon-192x192.png',  // Update this path
            '/LuminaMedical/Favicons/favicon-512x512.png'  // Update this path
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });