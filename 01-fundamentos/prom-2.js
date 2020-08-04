function sumarUno( numero ) {

    return new Promise( ( resolve, reject ) => {

        if( numero >= 6 ) {
            reject( 'El número es muy alto' );
        }

        setTimeout(() => {
            resolve( numero + 1 );
        }, 800);
    });

}

sumarUno( 5 )
    .then( nuevoNumero => sumarUno( nuevoNumero ) )
    .then( nuevoNumero => sumarUno( nuevoNumero ) )
    .then( nuevoNumero => {
        console.log(nuevoNumero);
    })
    .catch( ( error ) => {
        console.log(error);
    })