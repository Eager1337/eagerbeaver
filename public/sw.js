// Portfolio OS offline cache for Explore. Only registered from the app in production.
const CACHE = "portfolio-os-explore-v1";
const OFFLINE_URLS = ["/explore"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(OFFLINE_URLS).catch(() => undefined)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isExplore = url.pathname === "/explore" || url.pathname.startsWith("/explore/");
  const isMedia = /\.(png|jpg|jpeg|webp|gif|svg|mp4|woff2?)$/i.test(url.pathname);
  if (!isExplore && !isMedia) return;

  event.respondWith(
    (async () => {
      try {
        const net = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(req, net.clone()).catch(() => undefined);
        return net;
      } catch {
        const cached = await caches.match(req);
        if (cached) return cached;
        if (isExplore) {
          const fallback = await caches.match("/explore");
          if (fallback) return fallback;
        }
        return new Response("Offline", { status: 503 });
      }
    })(),
  );
});