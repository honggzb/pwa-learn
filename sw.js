// console.log('Hello from service worker');

// v1

// "/", 这个一定要包含整个目录，不然无法离线浏览
const assets = ["/", "styles.css", "app.js", "sw-register.js", 
"https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"];

// 1. caching assets
self.addEventListener("install", event => {
  event.waitUntil(
      caches.open("assets").then( cache => {
          cache.addAll(assets);
      })
  );
});

//2. Serving Resources
self.addEventListener('fetch', event => {
  // 2.1 simple response
  // const response = new Response("hello, I am a response");
  // event.respondWith(response);
  // 2.2 cached response without updating feature
  // if(event.request.url === 'http://localhost:8080/fake') {
  //   const response = new Response(`hello, I am a response on URL ${event.request.url}`);
  //    event.respondWith(response);
  // } else {
  //   // if the resources is cached
  //   caches.open('assets').then( cache => {
  //     cache.match(event.request).then(cachedResponse => {
  //       if(cachedResponse) {
  //         return cachedResponse;
  //       } else {
  //         return fetch(event.request);
  //       }
  //     })
  //   })
  // }
  // 2.3 cached response with updating feature
  // State while revalidate strategy
  event.respondWith(
    caches.match(event.request)
        .then( cachedResponse => {
            // Even if the response is in the cache, we fetch it and update the cache for future usage
            const fetchPromise = fetch(event.request).then(
                 networkResponse => {
                    caches.open("assets").then( cache => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            // We use the currently cached version if it's there
            return cachedResponse || fetchPromise; // cached or a network fetch
        })
    );
});


