const weatherApp = "Weather-App"
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  
  "/assets/icon-48x48.png",
  "/assets/icon-72x72.png",
  "/assets/icon-96x96.png",
  "/assets/icon-128x128.png",
  "/assets/icon-144x144.png",
  "/assets/icon-152x152.png",
  "/assets/icon-192x192.png",
  "/assets/icon-384x384.png",
  "/assets/icon-512x512.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(weatherApp).then(cache => {
      cache.addAll(assets)
    })
  )
})



