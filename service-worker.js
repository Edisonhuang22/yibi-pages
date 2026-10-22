const CACHE = 'yibi-static-v28';
const CORE = ['./', './index.html', './manifest.webmanifest', './favicon.png', './favicon.svg', './icons/icon-192.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(async cache => {
      await Promise.allSettled(CORE.map(url => cache.add(url)));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;

  // 1. Navigation requests: Network with 2.5s timeout, falling back to cache immediately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        let timer;
        const timeoutPromise = new Promise((_, reject) => {
          timer = setTimeout(() => reject(new Error('Network timeout')), 2500);
        });
        const fetchPromise = fetch(event.request).then(response => {
          clearTimeout(timer);
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        });

        try {
          return await Promise.race([fetchPromise, timeoutPromise]);
        } catch {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const rootFallback = await caches.match('./') || await caches.match('./index.html');
          if (rootFallback) return rootFallback;
          return fetchPromise;
        }
      })()
    );
    return;
  }

  // 2. Static immutable assets: Cache-First for instant 0ms load
  const isStatic = url.pathname.includes('/assets/') ||
                   url.pathname.includes('/vendor/') ||
                   url.pathname.includes('/icons/') ||
                   /\.(png|svg|css|js|webmanifest)$/.test(url.pathname);

  if (isStatic) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(event.request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 3. Other requests: Network-First with cache fallback
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
