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

        const fechaGFCRE = new Date(predio.GFCRE).toISOString().split('T')[0];  // Solo fecha (sin hora)
        console.log("Fecha de GFCRE:", fechaGFCRE);

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
                GACAPISOS = :GACAPISOS,
                GACAPUER = :GACAPUER,
                GACATUMB = :GACATUMB,
                GCLOSER = :GCLOSER,
                GCUBIACAB = :GCUBIACAB,
                GCUBRVENT = :GCUBRVENT,
                GESCALERAS = :GESCALERAS,
                GESTCOLU = :GESTCOLU,
                GESTCUBIER = :GESTCUBIER,
                GESTEPISO = :GESTEPISO,
                GESTPARE = :GESTPARE,
                GESTVIGAS = :GESTVIGAS,
                GINBANIOS = :GINBANIOS,
                GISANI = :GISANI,
                GREVESCA = :GREVESCA,
                GREVINTERIOR = :GREVINTERIOR,
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

exports.guardarPrediosRURAL = async (req, res) => {
    try {
        let predio = req.body;
        console.log('Datos recibidos:', predio);

        const fechaGFCRE = new Date(predio.GFCRE).toISOString().split('T')[0];  // Solo fecha (sin hora)
        console.log("Fecha de GFCRE:", fechaGFCRE);

        // Definir los campos requeridos para validar
        const requiredFields = [
            'PRU01CODI',
        ];

        // Validar que todos los campos requeridos estén en el objeto 'predio'
        for (let field of requiredFields) {
            if (!predio[field]) {
                return res.status(400).json({ message: `Falta el campo ${field} en el predio.` });
            }
        }

        // Construir la consulta SQL para insertar o actualizar el predio
        const query = `
            MERGE INTO ERPSPP.APP_PRUPRED t
            USING (SELECT :GID AS GID FROM DUAL) s
            ON (t.GID = s.GID)
            WHEN MATCHED THEN
                UPDATE SET 
                POLIGONO = :POLIGONO,
                LOTE = :LOTE,
                CLAVE_CATASTRAL = :CLAVE_CATASTRAL,
                CLAVE_ANTERIOR = :CLAVE_ANTERIOR,
                BLOQUE = :BLOQUE,
                PISO = :PISO,
                DPTO = :DPTO,
                AREAGIS = :AREAGIS,
                PRU01CODI = :PRU01CODI,
                GSECTOR = :GSECTOR,
                GCALLEPRI = :GCALLEPRI,
                GNROCASA = :GNROCASA,
                GCALLESECUN = :GCALLESECUN,
                GRESOLUCION = :GRESOLUCION,
                GPROANTE = :GPROANTE,
                GCALLN = :GCALLN,
                GCALLS = :GCALLS,
                GCALLE = :GCALLE,
                GCALLO = :GCALLO,
                GAREACONS  = :GAREACONS,
                GALICTA = :GALICTA, 
                GALICTA_TER = :GALICTA_TER, 
                GESTA = :GESTA,
                GFCRE = TO_DATE('${fechaGFCRE}', 'YYYY-MM-DD'),
                GLCREA = :GLCREA, 
                GTIPO = :GTIPO,
                GTPRIESGO = :GTPRIESGO,
                GDRENAJE = :GDRENAJE, 
                GTOPOGRAFIA = :GTOPOGRAFIA,
                GEROSION = :GEROSION,
                GFORMA = :GFORMA,
                GPOBLACERCA = :GPOBLACERCA,
                GORDENVIA = :GORDENVIA,
                GRIEGO = :GRIEGO,
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
                GTENENCIA = :GTENENCIA,
                GDOMINIO = :GDOMINIO,
                MOTIVO = :MOTIVO,   
                CLASETIERRA = :CLASETIERRA,
                ZONAINFLUENCIA = :ZONAINFLUENCIA,
                PRU30CODI = :PRU30CODI,
                NROCEDULA = :NROCEDULA,
                APELLIDOS = :APELLIDOS,
                NOMBRES = :NOMBRES,
                TELEFONO = :TELEFONO,
                MARCA = :MARCA,
                GEOCODIGO = :GEOCODIGO,
                IDPREDIORURAL = :IDPREDIORURAL
                   
            WHEN NOT MATCHED THEN
                INSERT (
                    POLIGONO, LOTE , CLAVE_CATASTRAL, CLAVE_ANTERIOR, BLOQUE, PISO, DPTO, AREAGIS, PRU01CODI, GSECTOR, GCALLEPRI, GNROCASA, GCALLESECUN, GRESOLUCION, GPROANTE, GCALLN,
                    GCALLS, GCALLE, GCALLO, GAREACONS, GALICTA, GALICTA_TER, GESTA, GFCRE, GLCREA, GTIPO, GTPRIESGO, GDRENAJE, GTOPOGRAFIA, GEROSION, GFORMA, GPOBLACERCA, GORDENVIA,
                    GRIEGO, GAGUA, GEELE, GBORDILLO, GACERA, GALCCAN, GTEPRI, GRBASUDOMI, GRBASUCALLE, GABAAGU, GALUMBPUB, GMEDENERGIA, GAGUAMEDIDOR, GNROPERSONA, GVIASUSO, GVIASMATE,
                    GLONGITUD, GPERIMETRI, GTENENCIA, GDOMINIO, MOTIVO, CLASETIERRA, ZONAINFLUENCIA, PRU30CODI, NROCEDULA, APELLIDOS, NOMBRES, TELEFONO, MARCA, GEOCODIGO, IDPREDIORURAL

                ) VALUES (
                    :POLIGONO, :LOTE, :CLAVE_CATASTRAL, :CLAVE_ANTERIOR, :BLOQUE, :PISO, :DPTO, :AREAGIS, :PRU01CODI, :GSECTOR, :GCALLEPRI, :GNROCASA, :GCALLESECUN, :GRESOLUCION,
                    :GPROANTE, :GCALLN, :GCALLS, :GCALLE, :GCALLO, :GAREACONS, :GALICTA, :GALICTA_TER, :GESTA, TO_DATE('${fechaGFCRE}', 'YYYY-MM-DD'), :GLCREA, :GTIPO, :GTPRIESGO,
                    :GDRENAJE, :GTOPOGRAFIA, :GEROSION, :GFORMA, :GPOBLACERCA, :GORDENVIA, :GRIEGO, :GAGUA, :GEELE, :GBORDILLO, :GACERA, :GALCCAN, :GTEPRI, :GRBASUDOMI,
                    :GRBASUCALLE, :GABAAGU, :GALUMBPUB, :GMEDENERGIA, :GAGUAMEDIDOR, :GNROPERSONA, :GVIASUSO, :GVIASMATE, :GLONGITUD, :GPERIMETRI, :GTENENCIA, :GDOMINIO, :MOTIVO,
                    :CLASETIERRA, :ZONAINFLUENCIA, :PRU30CODI, :NROCEDULA, :APELLIDOS, :NOMBRES, :TELEFONO, :MARCA, :GEOCODIGO, :IDPREDIORURAL
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


