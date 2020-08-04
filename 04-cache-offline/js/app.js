

if( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

// if( window.caches ) {
//     // Abre algo llamado prueba-1, si no existe, lo crea
//     caches.open('prueba-1');

//     // Verifica si existe algo llamado prueba-1 en el caché. 
//     // Retorna una promesa, su resultado es un booleano
//     caches.has('prueba-1').then( resp => {
//         console.log(resp);
//     });

//     // Borra el elemento en caché.
//     // Retorna una promesa, donde su resultado es un booleano indicando si lo borró o no.
//     caches.delete('prueba-1').then( resp => {
//         console.log(resp);
//     });

//     caches.open('cache-v1.1').then( cache => {
//         // cache.add('/index.html');

//         cache.addAll([
//             '/index.html',
//             '/css/style.css',
//             '/img/main.jpg'
//         ]).then( () => {
//             // cache.delete('/css/style.css');
//             cache.put('/index.html', new Response('Hola Mundo'));
//         });

//         // Preguntar si existe.
//         // Retorna una promesa, su valor puede ser el elemento deseado, o undefined
//         // cache.match('/index.html').then( resp => {
//         //     resp.text().then( resp2 => {
//         //         console.log(resp2);
//         //     });
//         // });

//     });

//     caches.keys().then( keys => {
//         console.log(keys);
//     });
// }