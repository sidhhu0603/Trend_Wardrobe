// Service worker code
self.addEventListener('install', function(event) {
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', function(event) {
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request)
            .then(function(response) {
                // Cache the fetched files
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                var responseToCache = response.clone();
                caches.open('v1').then(function(cache) {
                    cache.put(event.request, responseToCache);
                });

                return response;
            })
            .catch(function(err) {
                console.error('Service Worker: Error fetching and caching new data:', err);
            })
    );
});
