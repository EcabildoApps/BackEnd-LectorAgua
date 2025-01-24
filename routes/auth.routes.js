const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { medidorRoutes } = require('../controllers/searchmeter.controller');
const { cuentaRoutes } = require('../controllers/speedread.controller');
const { correctRoutes } = require('../controllers/correctread.controller');
const { obtenerDatos } = require('../controllers/toma.controller');
const { guardarTomaLectura } = require('../controllers/guardarToma.controller');
const { obtenerLecturas, guardarLectura } = require('../controllers/lecturas.controller');  



// Ruta para login
router.post('/login', login);
router.get('/meter', medidorRoutes)
router.get('/lecturaR', cuentaRoutes)
router.get('/correctL', correctRoutes)
router.get('/toma', obtenerDatos)
router.post('/guardarTomaLectura', guardarTomaLectura)

router.get('/lecturas', obtenerLecturas);  // Ruta para obtener lecturas
router.post('/lecturas', guardarLectura);  // Ruta para guardar lecturas

module.exports = router;
