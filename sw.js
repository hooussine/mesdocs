const CACHE_NAME = "mes-docs-admin-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/mesdocs/index.html",
    "/mesdocs/style.css",
    "/mesdocs/app.js",
    "/mesdocs/manifest.json",
    
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

/*  "/mesdocs/manifest.json",
    "/mesdocs/docs/permis.pdf",
    "/mesdocs/docs/cmr.pdf",
    "/mesdocs/docs/livret.pdf",
    "/mesdocs/docs/assurance.pdf",
    "/mesdocs/docs/najat.pdf",
    "/mesdocs/docs/houssine.pdf",
    "/mesdocs/docs/mutuelle.pdf",
    "/mesdocs/docs/cartebq.pdf",  */

