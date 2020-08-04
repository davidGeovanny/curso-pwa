let usuario = {
    nombre: 'Geovanny',
    edad: 21
};

fetch( 'https://reqres.in/api/users', {
    method: 'POST', // PUT
    body: JSON.stringify( usuario ), // data
    headers: {
        'Content-Type': 'application/json'
    }
})
.then( data => data.json() )
.then( dataObj => {
    console.log( dataObj );
})
.catch( error  => {
    console.log('Error en la petición');
    console.log(error);
})