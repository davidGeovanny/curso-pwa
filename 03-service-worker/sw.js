
// Ciclo de vida del SW

self.addEventListener('install', event => {
    console.log('SW: Instalando el SW');

    const instalacion = new Promise( ( resolve, reject ) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1);

        // Evitar que tenga que esperar para que tome el control
    });

    event.waitUntil( instalacion );
});

// Cuando el SW toma el control de la aplicación
self.addEventListener('activate', event => {
    // Borrar caché viejo
    console.log('SW: Activo y listo para controlar la aplicación');
});

// Fetch: Manejo de peticiones HTTP
self.addEventListener('fetch', event => {
    // Aplicar estrategias del caché
    // console.log('SW: ', event.request.url);

    // if( event.request.url.includes('https://reqres.in/') ) {
    //     const resp = new Response(
    //         `{
    //             ok: false,
    //             mensaje: 'Un mensaje'
    //         }`
    //     );

    //     event.respondWith( resp );
    // }
});

// Sync: Cuando se recupera la conexión a internet
self.addEventListener('sync', event => {
    console.log('Tenemos conexión');
    console.log(event);
    console.log(event.tag);
});

// Push: Manejar las push notifications
self.addEventListener('push', event => {
    console.log('Notificación recibida');
});