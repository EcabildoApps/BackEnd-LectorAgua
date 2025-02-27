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

exports.obtenerCatalogosConstruccion = async (req, res) => {
    try {
        // Consultamos todos los catálogos de una sola vez
        const result = await Promise.all([
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(50)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(51)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(52)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(53)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(54)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(55)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(56)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(57)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(60)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(61)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(62)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(63)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(64)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(65)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(66)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(67)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(68)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(69)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(70)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(72)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(71)`, { type: db.Sequelize.QueryTypes.SELECT }),
            db.sequelize.query(`SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM ERPSPP.REN21 WHERE REN20CODI = F_CATALOGO_PREDIOS(73)`, { type: db.Sequelize.QueryTypes.SELECT })
        ]);

        // Estructuramos la respuesta para cada catálogo
        const catalogos = {
            estructura: result[0] || [],
            estestadoCons: result[1] || [],
            columna: result[2] || [],
            vigas: result[3] || [],
            paredes: result[4] || [],
            entrePiso: result[5] || [],
            estructuraCubierta: result[6] || [],
            escalera: result[7] || [],
            tumbados: result[8] || [],
            puerta: result[9] || [],
            cubreVentana: result[10] || [],
            revInterior: result[11] || [],
            revExterior: result[12] || [],
            revPisos: result[13] || [],
            revEscalera: result[14] || [],
            cubiertaAcabados: result[15] || [],
            ventanas: result[16] || [],
            closet: result[17] || [],
            insSanitarias: result[18] || [],
            nroBanios: result[19] || [],
            insElectricas: result[20] || [],
            insEspeciales: result[21] || []
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

exports.guardarPredios = async (req, res) => {
    try {
        let predio = req.body;
        console.log('Datos recibidos:', predio);

        const fechaGFCRE = new Date(predio.GFCRE).toISOString().split('T')[0];  // Solo fecha (sin hora)
        console.log("Fecha de GFCRE:", fechaGFCRE);

        // Definir los campos requeridos para validar
        const requiredFields = [
         'PUR01CODI',
        ];

        // Validar que todos los campos requeridos estén en el objeto 'predio'
        for (let field of requiredFields) {
            if (!predio[field]) {
                return res.status(400).json({ message: `Falta el campo ${field} en el predio.` });
            }
        }

        // Construir la consulta SQL para insertar o actualizar el predio
        const query = `
            MERGE INTO ERPSPP.APP_PURPRED t
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
                    PREDIO = :PREDIO,
                    GEOCODIGO = :GEOCODIGO,
                    CLAVE_CATASTRAL = :CLAVE_CATASTRAL,
                    CLAVE_ANTERIOR = :CLAVE_ANTERIOR,
                    BLOQUE = :BLOQUE,
                    PISO = :PISO,
                    DPTO = :DPTO,
                    AREAESCR = :AREAESCR,
                    PUR01CODI = :PUR01CODI,
                    GURBANIZA = :GURBANIZA,
                    GCALLEPRI = :GCALLEPRI,
                    GNROCASA = :GNROCASA,
                    GCALLESECUN = :GCALLESECUN,
                    GRESOLUCION = :GRESOLUCION,
                    GPROANTE = :GPROANTE,
                    GCALL1 = :GCALL1,
                    GCALL2 = :GCALL2,
                    GCALL3 = :GCALL3,
                    GCALL4 = :GCALL4,
                    GALICTA = :GALICTA,
                    GALICTA_TER = :GALICTA_TER,
                    GESTA = :GESTA,
                    GFCRE = TO_DATE('${fechaGFCRE}', 'YYYY-MM-DD'),
                    GLCREA = :GLCREA,
                    GTIPO = :GTIPO,
                    GOCUPACION = :GOCUPACION,
                    GCARACTERE = :GCARACTERE,
                    GTOPOGRAFIA = :GTOPOGRAFIA,
                    GLOCALIZA = :GLOCALIZA,
                    GFORMA = :GFORMA,
                    GAGUA = :GAGUA,
                    GEELE = :GEELE,
                    GBORDILLO = :GBORDILLO,
                    GACERA = :GACERA,
                    GALCCAN = :GALCCAN,
                    GTEPRI = :GTEPRI,
                    GRBASUDOMI = :GRBASUDOMI,
                    GRBASUCALLE = :GRBASUCALLE,
                    GABAAGU = :GABAAGU,
                    GALUMBPUB = :GALUMBPUB,
                    GMEDENERGIA = :GMEDENERGIA,
                    GAGUAMEDIDOR = :GAGUAMEDIDOR,
                    GNROPERSONA = :GNROPERSONA,
                    GVIASUSO = :GVIASUSO,
                    GVIASMATE = :GVIASMATE,
                    GLONGITUD = :GLONGITUD,
                    GPERIMETRI = :GPERIMETRI,
                    GFONDRELA = :GFONDRELA,
                    OGESTADO = :OGESTADO,
                    GTENENCIA = :GTENENCIA,
                    GDOMINIO = :GDOMINIO,
                    MOTIVO = :MOTIVO,
                    NROCEDULA = :NROCEDULA,
                    APELLIDOS = :APELLIDOS,
                    NOMBRES = :NOMBRES,
                    TELEFONO = :TELEFONO,
                    MARCA = :MARCA,
                    IDPREDIOURBANO = :IDPREDIOURBANO
            WHEN NOT MATCHED THEN
                INSERT (
                    GID, PROVINCIA, CANTON, PARROQUIA, ZONA, SECTOR, MANZANA, PREDIO, GEOCODIGO, CLAVE_CATASTRAL, CLAVE_ANTERIOR, BLOQUE, PISO, DPTO, AREAESCR, PUR01CODI, GURBANIZA,
                    GCALLEPRI, GNROCASA, GCALLESECUN, GRESOLUCION, GPROANTE, GCALL1, GCALL2, GCALL3, GCALL4, GALICTA, GALICTA_TER, GESTA, GFCRE, GLCREA, GTIPO, GOCUPACION, GCARACTERE,
                    GTOPOGRAFIA, GLOCALIZA, GFORMA, GAGUA, GEELE, GBORDILLO, GACERA, GALCCAN, GTEPRI, GRBASUDOMI, GRBASUCALLE, GABAAGU, GALUMBPUB, GMEDENERGIA, GAGUAMEDIDOR, GNROPERSONA,
                    GVIASUSO, GVIASMATE, GLONGITUD, GPERIMETRI, GFONDRELA, OGESTADO, GTENENCIA, GDOMINIO, MOTIVO, NROCEDULA, APELLIDOS, NOMBRES, TELEFONO, MARCA, IDPREDIOURBANO
                ) VALUES (
                    :GID, :PROVINCIA, :CANTON, :PARROQUIA, :ZONA, :SECTOR, :MANZANA, :PREDIO, :GEOCODIGO, :CLAVE_CATASTRAL, :CLAVE_ANTERIOR, :BLOQUE, :PISO, :DPTO, :AREAESCR, :PUR01CODI,
                    :GURBANIZA, :GCALLEPRI, :GNROCASA, :GCALLESECUN, :GRESOLUCION, :GPROANTE, :GCALL1, :GCALL2, :GCALL3, :GCALL4, :GALICTA, :GALICTA_TER, :GESTA,  TO_DATE('${fechaGFCRE}', 'YYYY-MM-DD'), :GLCREA, :GTIPO,
                    :GOCUPACION, :GCARACTERE, :GTOPOGRAFIA, :GLOCALIZA, :GFORMA, :GAGUA, :GEELE, :GBORDILLO, :GACERA, :GALCCAN, :GTEPRI, :GRBASUDOMI, :GRBASUCALLE, :GABAAGU, :GALUMBPUB,
                    :GMEDENERGIA, :GAGUAMEDIDOR, :GNROPERSONA, :GVIASUSO, :GVIASMATE, :GLONGITUD, :GPERIMETRI, :GFONDRELA, :OGESTADO, :GTENENCIA, :GDOMINIO, :MOTIVO, :NROCEDULA, :APELLIDOS,
                    :NOMBRES, :TELEFONO, :MARCA, :IDPREDIOURBANO
                )
        `;

        // Ejecutar la consulta
        console.log('Datos para la consulta:', predio);
        await db.sequelize.query(query, { replacements: predio });

        return res.status(200).json({ message: 'Predio guardado correctamente.' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ message: 'Error al guardar el predio.', error: error.message });
    }
};


exports.guardarPredioUrbano = async (req, res) => {
    try {
        let predio = req.body;

        console.log('Datos recibidos:', predio);


            const fechaActual = new Date();
            const fechaGFCRE = new Date(predio.GFCRE).toISOString().split('T')[0]; 

        if (!predio.TPPREDIO) {
            predio.TPPREDIO = 'PU';
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
                GFCRE = TO_DATE('${fechaGFCRE}', 'YYYY-MM-DD'),
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
                :GLCRE, TO_DATE('${fechaGFCRE}', 'YYYY-MM-DD'), :VALIDO, :MARCA, 
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


