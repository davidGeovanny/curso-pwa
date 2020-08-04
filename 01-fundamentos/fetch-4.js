let img = document.querySelector('img');

fetch( 'superman.png' )
    .then( data => data.blob() )
    .then( imagen => {
        console.log(imagen);
        let imgPath = URL.createObjectURL( imagen );
        img.src = imgPath;
    });