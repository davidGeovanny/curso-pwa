self.addEventListener('fetch', ( event ) => {

    // console.log(event.request.url.includes(''));

    // if( event.request.url.includes('.jpg') ) {
    //     console.log(event.request.url);

    //     let fotoReq = fetch( event.request.url );

    //     event.respondWith( fotoReq );
    // }

    // if( event.request.url.includes('style.css') ) {
    //     event.respondWith( null );
    // } else {
    //     event.respondWith( fetch( event.request ) );
    // }

    // if( event.request.url.includes('style.css') ) {
    //     let resp = new Response(`
    //         body {
    //             background-color: red !important;
    //             color: pink;
    //         }
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/css'
    //         }
    //     });

    //     event.respondWith( resp );
    // }

    // if( event.request.url.includes('main.jpg') ) {
    //     let nuevaFoto = fetch('img/main-patas-arriba.jpg');

    //     event.respondWith( nuevaFoto );
    // }

    const respuesta = fetch( event.request )
                    .then( resp => {
                        
                        console.log(resp);

                        return ( resp.ok ) ? resp : fetch('img/main.jpg');

                        // if( resp.ok ) {
                        //     return resp;
                        // } else {
                        //     return fetch('img/main.jpg');
                        // }

                    });

    event.respondWith( respuesta );

});