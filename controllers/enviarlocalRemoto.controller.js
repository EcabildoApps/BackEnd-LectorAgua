'use strict';

const db = require('../models');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

exports.guardarImagenes = async (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al cargar el archivo.', error: err.message });
        }

        const { IDCUENTA, TIPO_IMG, RUTA, DETALLE } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'No se ha recibido un archivo.' });
        }
        if (!IDCUENTA || !TIPO_IMG || !RUTA) {
            return res.status(400).json({ message: 'Faltan parámetros en la solicitud.' });
        }
        if (DETALLE && DETALLE.length > 240) {
            return res.status(400).json({ message: 'El detalle no puede tener más de 240 caracteres.' });
        }

        const MAX_DETALLE_LENGTH = 240;  // Limitar a 240 caracteres, por ejemplo
        const detalle = (DETALLE && DETALLE.length > MAX_DETALLE_LENGTH) ? DETALLE.slice(0, MAX_DETALLE_LENGTH) : DETALLE;


        try {
            const imagenPath = req.file.path;
            const imagenTipo = path.extname(imagenPath).substring(1);

            const MAX_PATH_LENGTH = 255;
            const MAX_TYPE_LENGTH = 10;
            const MAX_RUTA_LENGTH = 100;

            const pathImg = imagenPath.slice(0, MAX_PATH_LENGTH);
            const tipoImg = imagenTipo.slice(0, MAX_TYPE_LENGTH);
            const ruta = RUTA.slice(0, MAX_RUTA_LENGTH);

            const imagenBuffer = await sharp(imagenPath)
                .resize({ width: 80 })  // Mantener un tamaño decente
                .jpeg({ quality: 80 })  // Mejor calidad sin ser excesiva
                .toBuffer();


            const imagenHex = imagenBuffer.toString('hex');

            const fechaActual = new Date();
            const fechaFormato = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')} ${String(fechaActual.getHours()).padStart(2, '0')}:${String(fechaActual.getMinutes()).padStart(2, '0')}:${String(fechaActual.getSeconds()).padStart(2, '0')}`;

            const checkQuery = `
                SELECT ID_AGUALEC_APP_IMG FROM ERPGMPTE.AGUALEC_APP_IMG WHERE IDCUENTA = ${IDCUENTA}
            `;
            const existingImage = await db.sequelize.query(checkQuery, {
                type: db.Sequelize.QueryTypes.SELECT
            });

            if (existingImage.length > 0) {
                // Si ya existe, actualizar la imagen existente
                const updateQuery = `
                    UPDATE ERPGMPTE.AGUALEC_APP_IMG
                    SET BYTE_IMG = HEXTORAW('${imagenHex}'), 
                        FECHA_MODIFICACION = TO_DATE('${fechaFormato}', 'YYYY-MM-DD HH24:MI:SS'),
                        PATH_IMG = '${pathImg}',
                        TIPO_IMG = '${tipoImg}',
                        RUTA = '${ruta}',
                        DETALLE = ${detalle ? `'${detalle}'` : 'NULL'}
                    WHERE IDCUENTA = ${IDCUENTA}
                `;
                await db.sequelize.query(updateQuery, {
                    type: db.Sequelize.QueryTypes.UPDATE
                });

                return res.status(200).json({ message: 'Imagen reemplazada correctamente.' });

            } else {
                // Si no existe, insertar una nueva imagen
                const insertQuery = `
                    INSERT INTO ERPGMPTE.AGUALEC_APP_IMG (
                        ID_AGUALEC_APP_IMG, BYTE_IMG, FECHA_MODIFICACION, FECHA_REGISTRO, PATH_IMG, TIPO_IMG, RUTA, DETALLE, IDCUENTA
                    ) VALUES (
                        (SELECT COALESCE(MAX(ID_AGUALEC_APP_IMG), 0) + 1 FROM ERPGMPTE.AGUALEC_APP_IMG),
                        HEXTORAW('${imagenHex}'), 
                        TO_DATE('${fechaFormato}', 'YYYY-MM-DD HH24:MI:SS'),
                        TO_DATE('${fechaFormato}', 'YYYY-MM-DD HH24:MI:SS'),
                        '${pathImg}', 
                        '${tipoImg}', 
                        '${ruta}', 
                        ${detalle ? `'${detalle}'` : 'NULL'},
                        ${IDCUENTA}
                    )
                `;

                await db.sequelize.query(insertQuery, {
                    type: db.Sequelize.QueryTypes.INSERT
                });

                return res.status(200).json({ message: 'Imagen guardada correctamente.' });
            }
        } catch (error) {
            console.error('Error al guardar la imagen:', error);
            return res.status(500).json({ message: 'Error al guardar la imagen.', error: error.message });
        }
    });
};
