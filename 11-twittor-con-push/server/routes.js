// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();

const { PUBLIC_KEY, addSubscription, sendPush } = require('./push');

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});


// Almacenar la suscripción
router.post('/subscribe', ( req, res ) => {
  const suscripcion = req.body;

  // console.log(suscripcion);

  addSubscription( suscripcion );

  res.json('subscribe');
});

// Obtener el key público
router.get('/key', ( req, res ) => {
  res.send( PUBLIC_KEY );
});

// Enviar una notificación PUSH a las personas que se desee
// Es algo que se controla del lado del server (solo debe ejecutarse en el backend)
router.post('/push', ( req, res ) => {
  const POST = {
    title: req.body.title,
    body: req.body.body,
    user: req.body.user
  };

  sendPush( POST );

  res.json( POST );
});



module.exports = router;