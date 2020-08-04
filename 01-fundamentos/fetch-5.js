fetch( 'https://reqres.in/api/users/1000' )
    .then( data => {

        // data.clone().json().then( usuario => {
        //     console.log(usuario.data);
        // });

        // data.clone().json().then( usuario => {
        //     console.log(usuario.data);
        // });

        console.log(data);

        if( data.ok ) {
            // data.json().then( usuario => {
            //     console.log(usuario);
            // });
            return data.json();
        } else {
            // console.log('No existe el usuario 1000');
            throw new Error('No existe el usuario 1000');
        }


    })
    .then( data => console.log(data) )
    .catch( error => {
        console.log('Error en la petición: ', error);
    })