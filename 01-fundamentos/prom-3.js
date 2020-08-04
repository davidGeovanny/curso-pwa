function sumarLento( numero ) {
    return new Promise( ( resolve, reject ) => {
        setTimeout(() => {
            reject( 'Sumar Lento falló' );
            // resolve( numero + 1 );
        }, 800);
    });
}

let sumarRapido = ( numero ) => {
    return new Promise( ( resolve, reject ) => {
        setTimeout(() => {
           resolve( numero + 1 ); 
        }, 300);
    });
};

// sumarLento( 5 ).then( resultado => console.log(resultado) );
// sumarRapido( 10 ).then( resultado => console.log(resultado) );

// Acepta como argumento un arreglo de cualquier cosa, no solo promesas
Promise.all([ sumarRapido( 10 ), sumarLento( 5 ) ])
    .then( respuestas => {
        console.log(respuestas);
    })
    .catch( error => {
        console.log(error);
    })