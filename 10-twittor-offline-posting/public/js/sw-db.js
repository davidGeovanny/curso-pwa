const db = new PouchDB('mensajes');

function guardarMensaje ( mensaje ) {
    mensaje._id = new Date().toISOString();

    return db.put( mensaje ).then( () => {
        self.registration.sync.register('nuevo-post');

        const newResp = {
            ok: true,
            offline: true
        };

        console.log('Mensaje guardado para enviar después');

        return new Response( JSON.stringify( newResp ) );
    }).catch( error => {
        console.log('Error al guardar: ', error);
    });
}

// Postear mensajes a la BD
function postearMensajes() {
    let posteos = [];

    return db.allDocs( { include_docs: true } ).then( docs => {
        docs.rows.forEach( item => {
            let doc = item.doc;

            const FETCH_PROMISE = fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
            }).then( resp => {
                return db.remove( doc );
            });
            posteos.push( FETCH_PROMISE );
        });
        return Promise.all( posteos );
    });
}