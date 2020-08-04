// Tarea sobre promesas y fetch
// Realice resolución de cada ejercicio,

// compruebe el resultado en la consola y posteriormente
// siga con el siguiente.

// Comente TODO el código del ejercicio anterior
// antes de continuar con el siguiente.

// ==============================================
// Ejercicio #1
// ==============================================
/*
 Realizar un llamado FETCH a la siguiente API
 https://swapi.co/api/people/1/
 Imprima en consola el nombre y género de la persona.
*/

// Resolución de la tarea #1

let postData = ( data ) => {
    let userObject = { 
        nombre: data.name, 
        genero: data.gender 
    };

    console.log(userObject);

    return fetch( 'https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify( userObject ),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

fetch( 'https://swapi.co/api/people/1/' )
    .then( data => {
        if( data.ok ) {
            return data.json()
        } else {
            throw new Error('No es posible encontrar al personaje especificado');
        }
    })
    .then( postData ) // Al mandar así la función, la respuesta se agrega como argumento a la función
    .then( resp => resp.json() )
    .then( resp => {
        console.log( resp );
    })
    .catch( error => {
        console.log('Ha ocurrido un error: ', error);
    });




// ==============================================
// Ejercicio #2
// ==============================================
/*
 Similar al ejercicio anterior... haga un llamado a la misma api
 (puede reutilizar el código )
 https://swapi.co/api/people/1/
 
 Pero con el nombre y el género, haga un posteo
 POST a: https://reqres.in/api/users

 Imprima en consola el objeto y asegúrese que tenga
 el ID y la fecha de creación del objeto
*/

// Resolución de la tarea #2
