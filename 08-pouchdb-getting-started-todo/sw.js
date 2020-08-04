importScripts('js/sw-utils.js');

const CACHE_STATIC_NAME  = 'static-v1'; // Que no cambia
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTABLE_NAME = 'inmutable-v1'; // Que no cambia

const CACHE_LIMIT = 50;

const STATIC_SHELL = [
    '/',
    'index.html',
    'style/base.css',
    'style/bg.png',
    'js/app.js',
    'js/base.js',
    'js/sw-utils.js'
];

const INMUTABLE_SHELL = [
    'https://cdn.jsdelivr.net/npm/pouchdb@7.1.1/dist/pouchdb.min.js'
];

self.addEventListener('install', event => {
    const CACHE_STATIC_PROMISE = caches.open( CACHE_STATIC_NAME ).then( cache => {
        return cache.addAll( STATIC_SHELL );
    });

    const CACHE_INMUTABLE_PROMISE = caches.open( CACHE_INMUTABLE_NAME ).then( cache => {
        return cache.addAll( INMUTABLE_SHELL );
    });

    event.waitUntil( Promise.all( [ CACHE_STATIC_PROMISE, CACHE_INMUTABLE_PROMISE ] ) );
});

self.addEventListener('activate', event => {
    const respCache = caches.keys().then( keys => {
        keys.forEach( key => {
            if( key !== CACHE_STATIC_NAME && key.includes('static') ) {
                return caches.delete( key );
            }
        });
    }); 

    event.waitUntil( respCache );
});

self.addEventListener('fetch', event => {
    const respCache = caches.match( event.request ).then( resp => {
        if( resp ) {
            return resp;
        } else {
            fetch( event.request ).then( newResp => {
                return actualizarCacheDinamico( CACHE_DYNAMIC_NAME, event.request, newResp );
            });
        }
    });
    
    event.respondWith( respCache );
});