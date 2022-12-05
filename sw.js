const CACHE_NAME = 'v1.cache.awp';
var urlToCache = [
    './', 
    './style.css', 
    './assets/Earthbound1.jpg',
    './assets/la-saga-de-earthbound-conocida-.gif',
    './assets/logo.png',
    './assets/Mother1.jpg',
    './assets/mother3.jpg',
    './assets/onettnight.png',
    './assets/Earthbound.tff',
    'assets/Slipknot-logo.jpg',
    './assets/Slipknot_Negra (1).png.opdownload',
    './assets/Slipknot-899x600.jpg',
    './assets/concert.jpg',
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlToCache)
            .then(() => {
                self.skipWaiting();
            })
        })
        .catch(err => {
            console.log("NO SE HA RESGUARDADO EL CACHE", err)
        })
    )
})

// event activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if(cacheWhiteList.indexOf(cacheName) === - 1){
                        // borrar los elementos que no necesita
                        return caches.delete(cacheName);
                    }
                })
            )
        })
        .then(() => {
            // activar la cache
            self.clients.claim();
        })
    )
})

// evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    )
})