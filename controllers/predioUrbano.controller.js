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

// Función para obtener todos los catálogos desde la base de datos
exports.obtenerCatalogos = async (req, res) => {
    try {
        // Consultamos todos los catálogos de una sola vez
        const result = await Promise.all([
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(1)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(2)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(3)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(4)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(5)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(6)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(7)`, {
                type: db.Sequelize.QueryTypes.SELECT
            })
        ]);

        // Estructuramos la respuesta para cada catálogo
        const catalogos = {
            ocupa: result[0],
            terreno: result[1],
            topografia: result[2],
            localiza: result[3],
            forma: result[4],
            viasuso: result[5],
            viasmate: result[6]
        };

        // Verificamos si algún catálogo está vacío
        for (const [key, value] of Object.entries(catalogos)) {
            if (value.length === 0) {
                catalogos[key] = { message: `No se encontraron datos para el catálogo de ${key}.` };
            }
        }

        return res.status(200).json({
            message: 'Datos obtenidos correctamente.',
            data: catalogos
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los datos.', error });
    }
};
