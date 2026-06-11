const CACHE_NAME = "odysseus-static-v14";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./assets/css/style.css?v=13",
  "./assets/js/app.js?v=13",
  "./manifest.webmanifest",
  "./assets/brand/odysseus-emblem.png",
  "./favicon.ico",
  "./assets/icons/favicon-32x32.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/maskable-192.png",
  "./assets/icons/maskable-512.png",
  "./assets/screenshots/screenshot-mobile.png",
  "./assets/screenshots/screenshot-wide.png",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin !== self.location.origin) return;
  if (event.request.method !== "GET") return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseCopy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
