

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
        .then( register => {
        //     setTimeout(() => {
        //         register.sync.register('posteo-gatitos');
        //         console.log('Se enviaron fotos de gatitos al servidor');
        //     }, 3000);
            Notification.requestPermission().then( result => {
                console.log(result);
                register.showNotification('Hola Mundo');
            });
        })

}

// fetch('https://reqres.in/api/users')
//     .then( resp => resp.text() )
//     .then( resp => {
//         console.log(resp)
//     });

// if( window.SyncManager ) {

// }