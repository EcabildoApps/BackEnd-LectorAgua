const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { medidorRoutes } = require('../controllers/searchmeter.controller');
const { cuentaRoutes } = require('../controllers/speedread.controller');
const { correctRoutes } = require('../controllers/correctread.controller');
const { obtenerDatos } = require('../controllers/toma.controller');

// Ruta para login
router.post('/login', login);
router.get('/meter', medidorRoutes)
router.get('/lecturaR', cuentaRoutes)
router.get('/correctL', correctRoutes)
router.get('/toma', obtenerDatos)

module.exports = router;

