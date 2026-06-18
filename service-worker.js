const CACHE_NAME = "budget-app-v1";

const urlsToCache = [

    "./",
    "./index.html",

    "./css/style.css",
    "./js/app.js",

    "./manifest.json",

    "https://cdn.jsdelivr.net/npm/chart.js"

];

/* ======================
   INSTALL
====================== */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches.open(CACHE_NAME)
                .then(cache => {

                    return cache.addAll(
                        urlsToCache
                    );

                })

        );

    }
);

/* ======================
   ACTIVATE
====================== */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches.keys()
                .then(keys => {

                    return Promise.all(

                        keys.map(key => {

                            if (
                                key !== CACHE_NAME
                            ) {

                                return caches.delete(
                                    key
                                );

                            }

                        })

                    );

                })

        );

    }
);

/* ======================
   FETCH
====================== */

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            )

            .then(response => {

                return (
                    response ||

                    fetch(event.request)
                );

            })

        );

    }
);