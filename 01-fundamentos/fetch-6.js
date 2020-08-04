fetch( 'no-encontrado.html' )
    .then( data => data.text() )
    .then( html => {
        let body = document.querySelector('body');
        body.innerHTML = html;
    })
    .catch( error => {
        console.log('Error en la petición: ', error);
    })