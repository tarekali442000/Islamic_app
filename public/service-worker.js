const STATIC_CACHE = "mawaqiti-static-v1";
const API_CACHE = "mawaqiti-api-v1";
const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== API_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim();
});

// Handle navigation requests with cache-first and fallback to index for offline navigation
async function handleNavigation(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    // Offline fallback to cached index
    const fallback = await cache.match("/index.html");
    if (fallback) return fallback;
    throw err;
  }
}

// Stale-while-revalidate for prayer-time API responses
async function handlePrayerApi(request) {
  const cache = await caches.open(API_CACHE);
  const cached = await cache.match(request);

  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.status === 200) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => undefined);

  return cached || networkFetch || Promise.reject(new Error("Network error"));
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Same-origin navigation and assets
  if (url.origin === self.location.origin) {
    if (request.mode === "navigate") {
      event.respondWith(handleNavigation(request));
    } else {
      event.respondWith(
        caches.match(request).then((cached) => {
          const fetchPromise = fetch(request)
            .then((response) => {
              const cacheName =
                request.url.includes("/icons/") ||
                request.url.includes("/manifest")
                  ? STATIC_CACHE
                  : STATIC_CACHE;
              caches.open(cacheName).then((cache) => {
                cache.put(request, response.clone());
              });
              return response;
            })
            .catch(() => cached);

          return cached || fetchPromise;
        })
      );
    }
    return;
  }

  // Prayer API caching
  if (url.hostname === "api.aladhan.com") {
    event.respondWith(handlePrayerApi(request));
    return;
  }
});
