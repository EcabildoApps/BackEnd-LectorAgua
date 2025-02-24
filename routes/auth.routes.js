const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { obtenerLecturas, guardarLectura, obtenercausas, obtenerNovedades } = require('../controllers/lecturas.controller');  
const { guardarImagenes } = require('../controllers/enviarlocalRemoto.controller');

const { uploadImage, getImage } = require('../controllers/cambioImgLogin.controller');

const {obtenerpredUrb, obtenerCatalogos, obtenerCatalogosConstruccion, obtenerConstruccion, guardarPredioUrbano} = require('../controllers/predioUrbano.controller');

const {obtenerpredRur, obtenerCatalogosRur, guardarPredioRural} = require('../controllers/predioRural.controller');

router.post('/login', login);
router.get('/lecturas', obtenerLecturas); 
router.post('/lecturas', guardarLectura);
router.get('/causas', obtenercausas); 
router.get('/novedades', obtenerNovedades);
router.post('/gimagen', guardarImagenes);

//Cambio de imagenes

router.post('/upload', uploadImage );
router.get('/getimage', getImage);

//Rutas para predios rurales
router.get('/prediosRur', obtenerpredRur);
router.get('/catalogoRur', obtenerCatalogosRur);
router.post('/prediosRur', guardarPredioRural);




//Rutas para predios urbanos

router.get('/prediosUrb', obtenerpredUrb);
router.get('/catalogo', obtenerCatalogos);
router.get('/construccion', obtenerCatalogosConstruccion);
router.get('/obtenercontruccion', obtenerConstruccion);  
router.post('/prediosUrb', guardarPredioUrbano);




module.exports = router;
