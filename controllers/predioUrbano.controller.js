'use strict';

const db = require('../models');

exports.obtenerpredUrb = async (req, res) => {
    try {
        const { geocodigo } = req.query;

        if (!geocodigo) {
            return res.status(400).json({ message: 'Falta el parámetro geocodigo.' });
        }

        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.APP_PURPRED WHERE GEOCODIGO = :geocodigo`, {
            replacements: { geocodigo },
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos para el número de geocodigo proporcionado.' });
        }

        return res.status(200).json({
            message: 'Datos obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las datos.', error });
    }
};
