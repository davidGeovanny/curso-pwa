function sumarLento( numero ) {
    return new Promise( ( resolve, reject ) => {
        setTimeout(() => {
            // reject( 'Sumar Lento falló' );
            resolve( numero + 1 );
        }, 800);
    });
}

let sumarRapido = ( numero ) => {
    return new Promise( ( resolve, reject ) => {
        setTimeout(() => {
            reject( 'Sumar Lento falló' );
            // resolve( numero + 1 ); 
        }, 300);
    });
};

Promise.race( [ sumarLento( 5 ), sumarRapido( 10 ) ] )
    .then( respuesta => {
        console.log(respuesta);
    })