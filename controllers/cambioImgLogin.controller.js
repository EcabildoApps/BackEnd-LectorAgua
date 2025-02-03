'use strict';

const multer = require('multer');
const path = require('path');
const fs = require('fs');



const uploadDir = path.join(__dirname, '../uploadsLogin');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const uniqueName = `image-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});


const upload = multer({ storage });

exports.uploadImage = async (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al subir la imagen', error: err });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No se subió ninguna imagen' });
        }

        const imageUrl = `${req.protocol}://${req.get('host')}/uploadsLogin/image${path.extname(req.file.originalname)}`;

        return res.status(200).json({
            message: 'Imagen cargada correctamente',
            imageUrl
        });
    });
};

exports.getImage = (req, res) => {
    const uploadDir = path.join(__dirname, '../uploadsLogin');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error al leer el directorio', error: err });
        }

        const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

        if (imageFiles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron imágenes' });
        }

        const latestImage = imageFiles.sort((a, b) => fs.statSync(path.join(uploadDir, b)).mtimeMs - fs.statSync(path.join(uploadDir, a)).mtimeMs)[0];

        const imageUrl = `${req.protocol}://${req.get('host')}/uploadsLogin/${latestImage}`;

        return res.status(200).json({
            message: 'Imagen obtenida correctamente',
            imageUrl
        });
    });
};
