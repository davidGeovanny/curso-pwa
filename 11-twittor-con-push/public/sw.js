// imports
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')

importScripts('js/sw-db.js');
importScripts('js/sw-utils.js');


const STATIC_CACHE    = 'static-v2';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js',
    'js/libs/plugins/mdtoast.min.js',
    'js/libs/plugins/mdtoast.min.css'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js'
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));



    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});





self.addEventListener( 'fetch', e => {

    let respuesta;

    if ( e.request.url.includes('/api') ) {

        // return respuesta????
        respuesta = manejoApiMensajes( DYNAMIC_CACHE, e.request );

    } else {

        respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                
                actualizaCacheStatico( STATIC_CACHE, e.request, APP_SHELL_INMUTABLE );
                return res;
                
            } else {
    
                return fetch( e.request ).then( newRes => {
    
                    return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
    
                });
    
            }
    
        });

    }

    e.respondWith( respuesta );

});


// tareas asíncronas
self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if ( e.tag === 'nuevo-post' ) {

        // postear a BD cuando hay conexión
        const respuesta = postearMensajes();
        
        e.waitUntil( respuesta );
    }



});

// Escuchar PUSH
self.addEventListener('push', event => {
    // console.log(event);
    // console.log(event.data.text());

    const data = JSON.parse( event.data.text() );
    console.log(data);

    const title = data.title;
    const options = {
        body: data.body,
        // icon: 'img/icons/icon-72x72.png'
        icon: `img/avatars/${ data.user.toLowerCase() }.jpg`,
        badge: 'img/favicon.ico',
        image: 'https://bucket-contra.s3.amazonaws.com/wp-content/uploads/2019/04/avengers-dinero-record.jpg',
        vibrate: [0,300,100,50,100,50,100,50,100,50,100,50,100,50,150,150,150,450,100,50,100,50,150,150,150,450,100,50,100,50,150,150,150,450,150,150],
        openUrl: '/',
        data: {
            url: '/',
            id: data.user
        },
        actions: [
            {
                action: 'thor-action',
                title: 'Thor',
                icon: 'img/avatar/thor.jpg'
            },
            {
                action: 'ironman-action',
                title: 'Ironman',
                icon: 'img/avatar/ironman.jpg'
            }

        ]
    };

    event.waitUntil( self.registration.showNotification( title, options ) );
});


// Cuando se cierra la notificación
self.addEventListener('notificationclose', event => {
    console.log('Notificación cerrada: ', event);
});

// Cuando se da clic en la notificación
self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const action = event.action;

    console.log({notification, action});

    const respuesta = clients.matchAll().then( resp => {
        // El parámetro son todas las pestañas de mi navegador
        // Si no hay ninguno, regresa undefined (o arreglo vacío)
        let cliente = resp.find( ( clienteItem => {
            return clienteItem.visibilityState === 'visible';
        }));

        if( cliente !== undefined ) {
            cliente.navigate( notification.data.url );
            cliente.focus(); // Para que haga focus a la ventana abierta
        } else {
            // Abre una ventana del navegador
            clients.openWindow( notification.data.url );
        }
        return notification.close();
    });

    event.waitUntil( respuesta );

});