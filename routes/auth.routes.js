const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { medidorRoutes } = require('../controllers/searchmeter.controller');
const { cuentaRoutes } = require('../controllers/speedread.controller');
const { correctRoutes } = require('../controllers/correctread.controller');
const { obtenerDatos } = require('../controllers/toma.controller');
const { guardarTomaLectura } = require('../controllers/guardarToma.controller');
const { obtenerLecturas, guardarLectura, obtenercausas, obtenerNovedades } = require('../controllers/lecturas.controller');  



// Ruta para login
router.post('/login', login);
router.get('/meter', medidorRoutes)
router.get('/lecturaR', cuentaRoutes)
router.get('/correctL', correctRoutes)
router.get('/toma', obtenerDatos)
router.post('/guardarTomaLectura', guardarTomaLectura)

router.get('/lecturas', obtenerLecturas); 
router.post('/lecturas', guardarLectura);
router.get('/causas', obtenercausas); 
router.get('/novedades', obtenerNovedades);

module.exports = router;
