fetch( 'https://reqres.in/api/users' )
    .then( data => data.json() )
    .then( dataJson => {
        console.log( dataJson );
    });