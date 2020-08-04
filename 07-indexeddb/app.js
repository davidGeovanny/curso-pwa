
// indexedDB: Reforzamiento
let request = window.indexedDB.open('mi-database', 1);

// Se actualiza cuando se crea o se sube de versión de la BD
request.onupgradeneeded = ( event ) => {
    console.log('Actualización de la BD');

    let db = event.target.result;

    db.createObjectStore('heroes', {
        keyPath: 'id'
    });
};

// Manejo de errores
request.onerror = ( error ) => {
    console.log('DB error: ', error.target.error);
};

// Insertar datos en la base de datos
request.onsuccess = ( event ) => {
    let db = event.target.result;

    let heroesData = [
        {
            id: '1',
            heroe: 'SpiderMan',
            mensaje: 'Mensaje de SpiderMan'
        },
        {
            id: '2',
            heroe: 'IronMan',
            mensaje: 'Mensaje de IronMan'
        }
    ];

    let heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = ( error ) => {
        console.log('Error guardando: ', error.target.error);
    };

    // Informa sobre el éxito de la transacción
    heroesTransaction.oncomplete = ( event ) => {
        console.log('Transacción hecha: ', event);
    };

    let heroesStore = heroesTransaction.objectStore('heroes');

    for (const heroe of heroesData) {
        heroesStore.add( heroe );
    }

    heroesStore.onsuccess = ( event ) => {
        console.log('Nuevo item agregado a IndexedDB');
    };
};