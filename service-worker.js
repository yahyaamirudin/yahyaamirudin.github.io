const CACHE_NAME = "cvku 1";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/biodata.html",
    "/pages/keterampilan.html",
    "/pages/pengalaman.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/assets/yahya.png",
    "/assets/icons/dribble 1.png",
    "/assets/icons/github.svg",
    "/assets/icons/icons8-behance 1.svg",
    "/assets/icons/icons8-instagram 1.svg",
    "/assets/icons/Logo CodePolitan Icon.png",
    "assets/images/html.svg",
    "assets/images/bootstrap.svg",
    "assets/images/css.svg",
    "assets/images/js.svg",
    "assets/images/ai.svg",
    "assets/images/photoshop.svg",
    "assets/images/xd.svg",
    "assets/images/figma.svg",
    "assets/images/1.svg",
    "assets/images/3.svg",
    "assets/images/4.svg",
    "assets/icons/person.svg",
    "assets/icons/Calender.svg",
    "assets/icons/alamat.svg",
    "assets/icons/phone.svg",
    "assets/icons/email.svg",
    "assets/icons/hobi.svg",
    "assets/icons/yahya.png"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    )
})

// mengambil asset dari cache
self.addEventListener("fetch", function (event) {
    event.respondWith(caches.match(event.request, {
        cacheName: CACHE_NAME
    }).then(function (response) {
        if (response) {
            console.log("Service worker : gunakan aset dari cache : ", response.url);
            return response;
        }

        console.log(
            "service worker : memuat aset dari server:", event.request.url
        )
        return fetch(event.request);
    }));
})

// menghapus cache lama
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("service worker:cache  " + cacheNames + " dihapus ");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})