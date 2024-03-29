const staticHLLVadeMecum = "hll-vade-mecum-v1.4"; // Update the cache version when changes are made
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/about.png",
  "/images/hll_arty.png",
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticHLLVadeMecum).then(cache => {
      return cache.addAll(assets); // Return the promise chain to properly handle errors
    })
  );
});

self.addEventListener("activate", activateEvent => {
  activateEvent.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // Delete outdated caches
          return cacheName.startsWith("hll-vade-mecum-") && cacheName !== staticHLLVadeMecum;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // Return cached response if found
      }

      return fetch(fetchEvent.request).then(networkResponse => {
        // Cache and return network response
        return caches.open(staticHLLVadeMecum).then(cache => {
          cache.put(fetchEvent.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
