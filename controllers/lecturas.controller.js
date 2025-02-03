'use strict';

const db = require('../models');

exports.obtenerLecturas = async (req, res) => {
    try {
        const { ruta } = req.query;

        if (!ruta) {
            return res.status(400).json({ message: 'Falta el parámetro ruta.' });
        }

        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.AGUALEC_APP WHERE RUTA = :ruta`, {
            replacements: { ruta },
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron lecturas para el número de ruta proporcionado.' });
        }

        return res.status(200).json({
            message: 'Lecturas obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las lecturas.', error });
    }
};


exports.guardarLectura = async (req, res) => {
    try {
        let lectura = req.body;

        console.log('Datos recibidos:', lectura);

        if (!lectura || !lectura.IDCUENTA || !lectura.NRO_CUENTA) {
            return res.status(400).json({ message: 'Faltan datos en la lectura proporcionada.' });
        }

        const requiredFields = [
            'IDCUENTA', 'NRO_CUENTA', 'NRO_MEDIDOR', 'CIU', 'CONSUMIDOR',
            'CEDULA_RUC', 'PARROQUIA', 'SECTOR', 'RUTA', 'DIRECCION', 'ESTADO', 'STATUS', 'TARIFA'
        ];

        for (let field of requiredFields) {
            if (lectura[field] === null || lectura[field] === undefined) {
                return res.status(400).json({ message: `Falta el campo ${field} en la lectura.` });
            }
        }

        lectura.FTOMA = null;

        const query = `
        MERGE INTO AGUALEC_APP t
        USING (SELECT :IDCUENTA AS IDCUENTA FROM DUAL) s
        ON (t.IDCUENTA = s.IDCUENTA)
        WHEN MATCHED THEN
            UPDATE SET 
                NRO_MEDIDOR = :NRO_MEDIDOR,
                CIU = :CIU,
                CONSUMIDOR = :CONSUMIDOR,
                CEDULA_RUC = :CEDULA_RUC,
                EMAIL = COALESCE(:EMAIL, NULL),
                PARROQUIA = :PARROQUIA,
                SECTOR = :SECTOR,
                RUTA = :RUTA,
                SEQUENCIA = :SEQUENCIA,
                DIRECCION = :DIRECCION,
                CLAVE_PREDIO = COALESCE(:CLAVE_PREDIO, NULL),
                ESTADO = :ESTADO,
                STATUS = :STATUS,
                TARIFA = :TARIFA,
                ALCANTARILLADO = :ALCANTARILLADO,
                LECT_ACTUAL = :LECT_ACTUAL,
                LECT_ANTERIOR = :LECT_ANTERIOR,
                CONSUMO_PROMEDIO = :CONSUMO_PROMEDIO,
                CONSUMO_CONTROL_MIN = :CONSUMO_CONTROL_MIN,
                CONSUMO_CONTROL_MAX = :CONSUMO_CONTROL_MAX,
                CONSUMO = :CONSUMO,
                EXONERACION = :EXONERACION,
                TERCERA_EDAD = :TERCERA_EDAD,
                DISCAPACIDAD = :DISCAPACIDAD,
                DEPARTAMENTO = :DEPARTAMENTO,
                PISO = :PISO,
                MANZANA = :MANZANA,
                TIPO = :TIPO,
                ANIOMES = :ANIOMES,
                ACTIVO = :ACTIVO,
                USER_LEC = :USER_LEC,
                FECHA_LEC =  NULL,
                X_LECTURA = :X_LECTURA,
                Y_LECTURA = :Y_LECTURA,
                X_MEDIDOR = :X_MEDIDOR,
                Y_MEDIDOR = :Y_MEDIDOR,
                TIPOCAUSA = :TIPOCAUSA,
                LEC04ID = :LEC04ID,
                FECHA_STRING_LEC = :FECHA_STRING_LEC,
                FTOMA = NULL,
                PORCENTAGE_CON_PROMEDIO = :PORCENTAGE_CON_PROMEDIO,
                TIPONOVEDAD = :TIPONOVEDAD
        WHEN NOT MATCHED THEN
            INSERT (
                IDCUENTA, NRO_MEDIDOR, CIU, CONSUMIDOR, CEDULA_RUC, EMAIL, PARROQUIA, 
                SECTOR, RUTA, SEQUENCIA, DIRECCION, CLAVE_PREDIO, ESTADO, STATUS, 
                TARIFA, ALCANTARILLADO, LECT_ACTUAL, LECT_ANTERIOR, CONSUMO_PROMEDIO, 
                CONSUMO_CONTROL_MIN, CONSUMO_CONTROL_MAX, CONSUMO, EXONERACION, 
                TERCERA_EDAD, DISCAPACIDAD, DEPARTAMENTO, PISO, MANZANA, TIPO, ANIOMES, 
                ACTIVO, USER_LEC, FECHA_LEC, X_LECTURA, Y_LECTURA, X_MEDIDOR, Y_MEDIDOR, 
                TIPOCAUSA, LEC04ID, FECHA_STRING_LEC, FTOMA, PORCENTAGE_CON_PROMEDIO, TIPONOVEDAD
            ) VALUES (
                :IDCUENTA, :NRO_MEDIDOR, :CIU, :CONSUMIDOR, :CEDULA_RUC, :EMAIL, :PARROQUIA, 
                :SECTOR, :RUTA, :SEQUENCIA, :DIRECCION, :CLAVE_PREDIO, :ESTADO, :STATUS, 
                :TARIFA, :ALCANTARILLADO, :LECT_ACTUAL, :LECT_ANTERIOR, :CONSUMO_PROMEDIO, 
                :CONSUMO_CONTROL_MIN, :CONSUMO_CONTROL_MAX, :CONSUMO, :EXONERACION, 
                :TERCERA_EDAD, :DISCAPACIDAD, :DEPARTAMENTO, :PISO, :MANZANA, :TIPO, :ANIOMES, 
                :ACTIVO, :USER_LEC, NULL, :X_LECTURA, :Y_LECTURA, :X_MEDIDOR, :Y_MEDIDOR, 
                :TIPOCAUSA, :LEC04ID, :FECHA_STRING_LEC, NULL, :PORCENTAGE_CON_PROMEDIO, :TIPONOVEDAD
            )
        `;

        await db.sequelize.query(query, { replacements: lectura });

        return res.status(200).json({ message: 'Lectura guardada correctamente.' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({ message: 'Error al guardar la lectura.', error });
    }
};





exports.obtenerNovedades = async (req, res) => {

    try {


        const result = await db.sequelize.query(
            `SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM REN21 WHERE REN20CODI = '323'`, {
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        return res.status(200).json({
            message: 'Novedades obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las novedades.', error });
    }


};


exports.obtenercausas = async (req, res) => {
    try {


        const result = await db.sequelize.query(
            `SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM REN21 WHERE REN20CODI = '627'`, {
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        return res.status(200).json({
            message: 'Causas obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las causas.', error });
    }

};