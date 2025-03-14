const CACHE_NAME = "mes-docs-admin-cache-v1";
const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
    "/docs/permis.pdf",
    "/docs/cmr.pdf",
    "/docs/livret.pdf",
    "/docs/assurance.pdf",
    "/docs/najat.pdf",
    "/docs/houssine.pdf",
    "/docs/mutuelle.pdf",
    "/docs/cartebq.pdf",
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
