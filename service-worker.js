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
        // use caches.open to find the specific cache by name, then add every file in the FILES_TO_CACHE array to cache.
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache : ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

// activation
self.addEventListener('activate', function(e) {
    e.waitUntil(
        // .keys returns an array of all cache names, which we're calling keyList.
        // keyList is a parameter that contains all cache names under <username>.github.io.
        caches.keys().then(function (keyList) {
            //  because we may host many sites from the same URL, we should filter out caches that have the app prefix.
            // capture the ones that have the prefix, stored in APP_PREFIX, and save them to an array called cacheKeeplist using the .filter() method.
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            // add current cache to keeplist
            cacheKeeplist.push(CACHE_NAME);

            // the last part of the activate listener returns a promise that resolves once all old versions of the cache have been deleted.
            return Promise.all(keyList.map(function (key, i) {
                if (cacheKeeplist.indexOf(key) === -1) {
                    console.log('deleting cache : ' + keyList[i]);
                    return caches.delete(keyList[i]);
                }
            }));
        })
    )
})

// retrieve infromation from the cahe
// listen for the fetch event, log the URL of the requested resource, and then define how to respond to the request.
self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    // respondWith() to intercept the fetch request.
    e.respondWith(
        // .match() to determine if the resource already exists in caches.
        caches.match(e.request).then(function (request) {
            if (request) { 
                // if cache is available, respond with cache
                console.log('responding with cache : ' + e.request.url)
                return request
                // if the resource is not in the caches, we allow the resources to be retrieved from the online network as usual.
            } else { 
                // if there are no caches, try fetching request.
                console.log('file is not cached, fetching: ' + e.request.url)
                return fetch(e.request)
            }
            // You can omit if/else for console.log & put one line below like this too.
            // return request || fetch(e.request) 
            // if the file isn't stored in the cache, the service worker will make a normal request for the resource.
        })

    )
})