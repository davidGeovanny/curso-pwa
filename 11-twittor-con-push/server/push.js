const urlSafeBase64 = require('urlsafe-base64');
const fs = require('fs');
const webpush = require('web-push');

const VAPID = require('./vapid.json');

const PUBLIC_KEY = urlSafeBase64.decode( VAPID.publicKey );

let suscripciones = require('./subs-db.json');

const addSubscription = ( subscription ) => {
    suscripciones.push( subscription );
    
    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));
};

webpush.setVapidDetails(
    'mailto:david.geovanny.cr@gmail.com',
    VAPID.publicKey,
    VAPID.privateKey
);

const sendPush = ( post ) => {
    console.log('Mandando un PUSH');

    let notificacionesEnviadas = [];
    // Mandar un push a todas las suscripciones
    suscripciones.forEach( ( suscripcion, index ) => {
        const pushPromise = webpush.sendNotification( suscripcion, JSON.stringify( post ) )
            .then( resp => {
                console.log('Notificación enviada');
            })
            .catch( error => {
                console.log('Notificación falló');

                // 410: gone - Ya no existe
                if( error.statusCode === 410 ) {
                    suscripciones[ index ].borrar = true;
                }
            });
        
        notificacionesEnviadas.push( pushPromise );
    });

    Promise.all( notificacionesEnviadas ).then( resp => {
        suscripciones = suscripciones.filter( ( suscripcion ) => {
            return !suscripcion.borrar;
        });
    });

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));
};

module.exports = {
    PUBLIC_KEY,
    addSubscription,
    sendPush
};