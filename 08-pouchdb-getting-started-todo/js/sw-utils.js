let actualizarCacheDinamico = ( cacheName, req, res ) => {
    if( res.ok ) {
        return caches.open( cacheName ).then( cache => {
            // Se almacena el lugar donde se hace el request (petición)
            // y la respuesta de dicha petición
            cache.put( req, res.clone() );
            return res.clone();
        });
    } else {
        return res;
    }
};