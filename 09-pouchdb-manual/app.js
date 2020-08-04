var ENTER_KEY = 13;
var newTodoDom = document.getElementById('new-todo');
var syncDom = document.getElementById('sync-wrapper');

let btnAgregar = document.querySelector('#agregar');
let btnSincronizar = document.querySelector('#sincronizar');
let btnEliminar = document.querySelector('#eliminar');

btnAgregar.addEventListener('click', function(e) {
    e.preventDefault();
    addTodo(); 
});

btnSincronizar.addEventListener('click', function(e) {
    e.preventDefault();
    changeSynchronized(); 
});

btnEliminar.addEventListener('click', function(e) {
    e.preventDefault();
    deleteSynchronized(); 
});

// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
var db = new PouchDB('mensajes');

var remoteCouch = false;

db.changes({
    since: 'now',
    live: true
}).on('change', showTodos);



// 2- Insertar en la base de datos
function addTodo() {
    // Objeto a grabar en base de datos
    let mensaje = {
        _id: new Date().toISOString(),
        user: 'spiderman',
        mensaje: 'Mi tía hizo unos panqueques muy buenos',
        sincronizado: false
    };

    // db.put(todo, function callback(err, result) {
    //   if (!err) {
    //     console.log('Successfully posted a todo!');
    //   }
    // });

    db.put( mensaje ).then( () => {
      console.log('Insertado');
    }).catch( ( error ) => {
      console.log('Error: ', error);
    });
}


// 3- Leer todos los mensajes offline
// Los mensajes deben aparecer en la consola
function showTodos() {
    db.allDocs( { include_docs: true, descending: false } ).then( doc  => {
        // redrawTodosUI( doc.rows );
        // console.log(doc.rows);
        doc.rows.forEach( register => {
            console.log(register);
        });
        console.log('--------');
    });
}



// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
function changeSynchronized() {
    db.allDocs( { include_docs: true, descending: false } ).then( doc => {
        doc.rows.forEach( register => {
            register.doc.sincronizado = true;
            db.put( register.doc ).then( () => {
                console.log('Registro actualizado');
            }).catch( error => {
                console.log('Ha ocurrido un error al sincronizar: ', error);
            });
        });
    });
}




// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización 

function deleteSynchronized() {
    db.allDocs( { include_docs: true, descending: false } ).then( doc => {
        doc.rows.forEach( register => {
            if( register.doc.sincronizado ) {
                db.remove( register.doc );
            }
        });
    });
}





