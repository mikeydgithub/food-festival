const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
];

// now the broweser knows about the service worker from index.html, we need to install it.
// adding files to the precache, so that the application can use the cache.
// we'll do this by setting up event listeners.
self.addEventListener('install', function (e) {
    // e.waitUntil tells the broweser to wait until the work is complete before terminating the service worker.
    e.waitUntil(
        // use caches.open to find the specific cache by name, then add every files in the FILES_TO_CACHE array to cache.
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})