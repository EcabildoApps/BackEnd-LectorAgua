'use strict';

const db = require('../models');

exports.obtenerpredRur = async (req, res) => {
    try {
        const { poligono } = req.query;

        if (!poligono) {
            return res.status(400).json({ message: 'Falta el parámetro poligono.' });
        }

        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.APP_PRUPRED WHERE POLIGONO = :poligono`, {
            replacements: { poligono },
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos para el número de poligono proporcionado.' });
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
exports.obtenerCatalogosRur = async (req, res) => {
    try {
        // Consultamos todos los catálogos de una sola vez
        const result = await Promise.all([
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(111)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(112)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(0)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(10)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(100)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(101)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(103)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(104)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(106)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(110)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(109)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(113)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(105)`, {
                type: db.Sequelize.QueryTypes.SELECT
            }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(107)`, {
                type: db.Sequelize.QueryTypes.SELECT
            })
        ]);

        // Estructuramos la respuesta para cada catálogo
        const catalogos = {
            zonainfluencia: result[0],
            clasetierra: result[1],
            codparroquia: result[2],
            gtipo: result[3],
            gtenencia: result[4],
            gdominio: result[5],
            gpoblacerca: result[6],
            gordenvia: result[7],
            gtopografia: result[8],
            gforma: result[9],
            gdrenaje: result[10],
            gtpriesgo: result[11],
            griego: result[12],
            gerosion: result[13],
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


exports.obtenerConstruccion = async (req, res) => {
    try {
        const { TPPREDIO } = req.query;

        if (!TPPREDIO) {
            return res.status(400).json({ message: 'Falta el parámetro TPPREDIO.' });
        }

        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.APP_PRE_CONSTRUC WHERE TPPREDIO = :TPPREDIO`, {
            replacements: { TPPREDIO },
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron datos para el número de TPPREDIO proporcionado.' });
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

exports.guardarPredioRural = async (req, res) => {
    try {
        let predio = req.body;

        console.log('Datos recibidos:', predio);

        if (!predio.GFCRE) {
            const fechaActual = new Date();
            predio.GFCRE = `${fechaActual.getFullYear()}-${String(fechaActual.getMonth() + 1).padStart(2, '0')}-${String(fechaActual.getDate()).padStart(2, '0')} ${String(fechaActual.getHours()).padStart(2, '0')}:${String(fechaActual.getMinutes()).padStart(2, '0')}:${String(fechaActual.getSeconds()).padStart(2, '0')}`;
        }

        if (!predio.TPPREDIO) {
            predio.TPPREDIO = 'PR';
        }

        const requiredFields = [
            'TPPREDIO', 'PUR01CODI'
        ];


        for (let field of requiredFields) {
            if (predio[field] === null || predio[field] === undefined) {
                return res.status(400).json({ message: `Falta el campo ${field} en el predio.` });
            }
        }

        const query = `
        MERGE INTO APP_PRE_CONSTRUC t
        USING (SELECT :GID AS GID FROM DUAL) s
        ON (t.GID = s.GID)
        WHEN MATCHED THEN
            UPDATE SET 
                PROVINCIA = :PROVINCIA,
                CANTON = :CANTON,
                PARROQUIA = :PARROQUIA,
                ZONA = :ZONA,
                SECTOR = :SECTOR,
                MANZANA = :MANZANA,
                NPREDIO = :NPREDIO,
                CLAVE_CATASTRAL = :CLAVE_CATASTRAL,
                BLOQUE = :BLOQUE,
                PISO = :PISO,
                GIDLOTE = :GIDLOTE,
                AREABLGIS = :AREABLGIS,
                PUR01CODI = :PUR01CODI,
                PUR05CODI = :PUR05CODI,
                GANIOC = :GANIOC,
                GAREPAR = :GAREPAR,
                GACONS = :GACONS,
                GAREAL = :GAREAL,
                GESTRUCTURA = :GESTRUCTURA,
                GESTADOCONS = :GESTADOCONS,
                GPORREPARA = :GPORREPARA,
                GESTADO = :GESTADO,
                OBS = :OBS,
                GLCRE = :GLCRE,
                GFCRE = :GFCRE,
                VALIDO = :VALIDO,
                MARCA = :MARCA,
                IDPREDIOLOCALMENTE = :IDPREDIOLOCALMENTE,
                IDPREDIOCONST = :IDPREDIOCONST
        WHEN NOT MATCHED THEN
            INSERT (
                TPPREDIO, GID, PROVINCIA, CANTON, PARROQUIA, ZONA, SECTOR, 
                MANZANA, NPREDIO, CLAVE_CATASTRAL, BLOQUE, PISO, GIDLOTE, 
                AREABLGIS, PUR01CODI, PUR05CODI, GANIOC, GAREPAR, GACONS, 
                GAREAL, GESTRUCTURA, GESTADOCONS, GPORREPARA, GESTADO, OBS, 
                GLCRE, GFCRE, VALIDO, MARCA, IDPREDIOLOCALMENTE, IDPREDIOCONST
            ) VALUES (
                :TPPREDIO, :GID, :PROVINCIA, :CANTON, :PARROQUIA, :ZONA, :SECTOR, 
                :MANZANA, :NPREDIO, :CLAVE_CATASTRAL, :BLOQUE, :PISO, :GIDLOTE, 
                :AREABLGIS, :PUR01CODI, :PUR05CODI, :GANIOC, :GAREPAR, :GACONS, 
                :GAREAL, :GESTRUCTURA, :GESTADOCONS, :GPORREPARA, :GESTADO, :OBS, 
                :GLCRE, NULL, :VALIDO, :MARCA, 
                :IDPREDIOLOCALMENTE, :IDPREDIOCONST
            )
        `;

        console.log('Datos para la consulta:', predio);
        await db.sequelize.query(query, { replacements: predio });


        return res.status(200).json({ message: 'Predio guardado correctamente.' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ message: 'Error al guardar el predio.', error });
    }
};



