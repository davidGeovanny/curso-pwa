// const CACHE_NAME         = 'cache-1';
const CACHE_STATIC_NAME  = 'static-v2'; // Que no cambia
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

const CACHE_INMUTABLE_NAME = 'inmutable-v1'; // Que no cambia

const CACHE_LIMIT = 50;

let limpiarCache = ( cacheName, itemsCount ) => {
    caches.open( cacheName ).then( cache => {
        return cache.keys().then( keys => {
            if( keys.length > itemsCount ) {
                cache.delete( keys[0] ).then(
                    limpiarCache( cacheName, itemsCount )
                );
            }
        });
    })
};

self.addEventListener('install', event => {
    const cachePromise = caches.open( CACHE_STATIC_NAME ).then( cache => {

        return cache.addAll([
            '/',
            '/index.html',
            '/css/style.css',
            '/img/main.jpg',
            '/js/app.js',
            '/img/no-image.png'
        ]);

    });
    
    const cacheInmutablePromise = caches.open( CACHE_INMUTABLE_NAME ).then( cache => {

        return cache.addAll([
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
        ]);

    });

    event.waitUntil( Promise.all([ cachePromise, cacheInmutablePromise ]) );
    
    // event.waitUntil( cachePromise );
    // event.waitUntil( cacheInmutablePromise );
});

self.addEventListener('fetch', event => {
    // 1- Cache Only
    // Toda la aplicación servida desde el caché
    // event.respondWith( caches.match( event.request ) );

    // 2- Cache with Network Fallback
    // Intenta primero en caché, si no funciona, intenta en la red
    // const respCache = caches.match( event.request ).then( resp => {
    //     if( resp ) {
    //         return resp;
    //     }

    //     // No existe el archivo, ahora busca en la red
    //     console.log('No existe: ', event.request.url);

    //     return fetch( event.request ).then( newResp => {
    //         caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
    //             cache.put( event.request, newResp );
    //             limpiarCache( CACHE_DYNAMIC_NAME, CACHE_LIMIT );
    //         });
    //         return newResp.clone(); // Se usa el clone porque en el put se utilizó la respuesta
    //     });
    // });
    // event.respondWith( respCache );

    // 3- Network with Cache Fallback
    // Primero intenta por internet, si no puede, intenta en el caché
    // const respCache = fetch( event.request ).then( resp => {

    //     if( !resp ) {
    //         return caches.match( event.request );
    //     }

    //     console.log('Fetch: ', resp);
    //     caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
    //         cache.put( event.request, resp );
    //         limpiarCache( CACHE_DYNAMIC_NAME, CACHE_LIMIT );
    //     });
    //     return resp.clone();
    // }).catch( error => {
    //     return caches.match( event.request );
    // });
    
    // event.respondWith( respCache );

    // 4- Cache with Network Update
    // Cuando se quiere que la aplicación cargue lo más rápido posible.
    // Su rendimiento es crítico.
    // Siempre se encuentra un paso más atrás (desactualizado).
    // Se supone que todo está en el caché.
    // Muestra lo que está en el caché, mientras descarga la nueva versión y actualiza para la siguiente vez.
    // Para hacer la prueba, modificar el index.html, no se verán los cambios, recargar de nuevo para ver los cambios puestos
    // if( event.request.url.includes('bootstrap') ) {
    //     // Se hace esta condición porque el bootstrap se encuentra en el caché inmutable
    //     return event.respondWith( caches.match( event.request ) );
    // }

    // const respCache = caches.open( CACHE_STATIC_NAME ).then( cache => {
    //     fetch( event.request ).then( newResp => {
    //         cache.put( event.request, newResp );
    //     });

    //     return cache.match( event.request );
    // });

    // event.respondWith( respCache );

    // 5- Cache & Network Race
    const respCache = new Promise( ( resolve, reject ) => {
        let rechazada = false;
        const falloUnaVez = () => {
            if( rechazada ) {
                // Si entra aquí, quiere decir que no existe en el caché ni en la red
                if( /\.(png|jpg)$/i.test( event.request.url ) ) {
                    resolve( caches.match('/img/no-image.png') );
                } else {
                    reject('No se encontró respuesta');
                }
            } else {
                rechazada = true;
            }
        };

        fetch( event.request ).then( resp => {
            if( resp.ok ) {
                resolve( resp );
            } else {
                falloUnaVez();
            }
        }).catch( error => {
            falloUnaVez();
        });

        caches.match( event.request ).then( resp => {
            if( resp ) {
                resolve( resp );
            } else {
                falloUnaVez();
            }
        }).catch( error => {
            falloUnaVez();
        });
    });

    event.respondWith( respCache );

});