const staticHLLVadeMecum = "hll-vade-mecum-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/images/about.png",
  "/images/hll_arty.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticHLLVadeMecum).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})