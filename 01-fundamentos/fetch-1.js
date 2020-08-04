console.log('Hola Mundo');

let request = new XMLHttpRequest();

request.open('GET', 'https://reqres.in/api/users', true);
request.send(null);

request.onreadystatechange = function( status ) {
    if( request.readyState === 4 ) {
        let resp = request.response;
        let respObj = JSON.parse( resp );

        console.log(respObj);
    }
};