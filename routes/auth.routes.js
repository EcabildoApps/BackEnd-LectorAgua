const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { obtenerLecturas, guardarLectura, obtenercausas, obtenerNovedades } = require('../controllers/lecturas.controller');  
const { guardarImagenes } = require('../controllers/enviarlocalRemoto.controller');

const { uploadImage, getImage } = require('../controllers/cambioImgLogin.controller');



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


//Rutas para predios urbanos


module.exports = router;
