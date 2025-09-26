'use strict';

const db = require('../models');

exports.obtenerLecturas = async (req, res) => {
    try {
        const { ruta } = req.query;

        if (!ruta) {
            return res.status(400).json({ message: 'Falta el parámetro ruta.' });
        }

        const result = await db.sequelize.query(
            `SELECT * FROM ERPGMPTE.AGUALEC_APP WHERE RUTA = :ruta`, {
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

        // Validar datos mínimos
        if (!lectura || !lectura.IDCUENTA || !lectura.NRO_CUENTA) {
            return res.status(400).json({ message: 'Faltan datos en la lectura proporcionada.' });
        }

        // Limpiar y truncar DIRECCION
        if (lectura.DIRECCION) {
            lectura.DIRECCION = lectura.DIRECCION.replace(/[\n\r]/g, ' ')
                .replace(/\\/g, '')
                .trim();
        }

        // Validar campos obligatorios
        const requiredFields = [
            'IDCUENTA', 'NRO_CUENTA', 'CIU', 'CONSUMIDOR',
            'CEDULA_RUC', 'PARROQUIA', 'SECTOR', 'RUTA', 'ESTADO', 'STATUS', 'TARIFA'
        ];

        for (let field of requiredFields) {
            if (lectura[field] === null || lectura[field] === undefined) {
                return res.status(400).json({ message: `Falta el campo ${field} en la lectura.` });
            }
        }

        // Eliminar FTOMA si viene
        delete lectura.FTOMA;

        // Truncar strings según límites de tabla
        const varcharLimits = {
            CONSUMIDOR: 100,
            PARROQUIA: 100,
            SECTOR: 100,
            DIRECCION: 150,
            NRO_MEDIDOR: 30,
            SEQUENCIA: 30,
            CLAVE_PREDIO: 30,
            STATUS: 50,
            TARIFA: 50,
            TERCERA_EDAD: 30,
            DISCAPACIDAD: 30,
            USER_LEC: 30,
            FECHA_STRING_LEC: 30
        };

        for (const key in varcharLimits) {
            if (lectura[key]) lectura[key] = lectura[key].substring(0, varcharLimits[key]);
        }

        // Validar valores NUMBER(8,2) según tabla para evitar ORA-01438
        const max8Digits = 999999.99;
        ['LECT_ACTUAL', 'LECT_ANTERIOR', 'CONSUMO', 'CONSUMO_PROMEDIO', 'CONSUMO_CONTROL_MIN', 'CONSUMO_CONTROL_MAX'].forEach(f => {
            if (lectura[f] != null && lectura[f] > max8Digits) lectura[f] = max8Digits;
        });

        // Validar fechas
        if (lectura.FECHA_LEC) {
            lectura.FECHA_LEC = new Date(lectura.FECHA_LEC).toISOString().split('T')[0]; // 'YYYY-MM-DD'
        }

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
                FECHA_LEC = TO_DATE(:FECHA_LEC, 'YYYY-MM-DD'),
                X_LECTURA = :X_LECTURA,
                Y_LECTURA = :Y_LECTURA,
                X_MEDIDOR = :X_MEDIDOR,
                Y_MEDIDOR = :Y_MEDIDOR,
                TIPOCAUSA = :TIPOCAUSA,
                LEC04ID = :LEC04ID,
                FECHA_STRING_LEC = :FECHA_STRING_LEC,
                FTOMA = NULL,
                PORCENTAGE_CON_PROMEDIO = '',
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
                :ACTIVO, :USER_LEC, :FECHA_LEC, :X_LECTURA, :Y_LECTURA, :X_MEDIDOR, :Y_MEDIDOR,
                :TIPOCAUSA, :LEC04ID, :FECHA_STRING_LEC, NULL, '', :TIPONOVEDAD
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
            `SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM REN21 WHERE REN20CODI = '98'`, {
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
            `SELECT REN21CODI, REN21DESC, REN20CODI, REN21SUBF FROM REN21 WHERE REN20CODI = '79'`, {
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

exports.obtenerCoordenadas = async (req, res) => {
    try {
        // Realizar la consulta para obtener las coordenadas (latitud, longitud) y otros campos
        const result = await db.sequelize.query(
            `SELECT 
                NRO_MEDIDOR, 
                NRO_CUENTA, 
                CIU, 
                CONSUMIDOR, 
                CEDULA_RUC, 
                X_LECTURA AS longitud, 
                Y_LECTURA AS latitud, 
                DIRECCION
             FROM ERPGMPTE.AGUALEC_APP
             WHERE X_LECTURA IS NOT NULL AND Y_LECTURA IS NOT NULL`, {
            type: db.Sequelize.QueryTypes.SELECT
        });

        // Verificar si no se encontraron resultados
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron coordenadas de medidores.' });
        }

        // Devolver los resultados con las coordenadas (longitud y latitud) y los campos adicionales
        return res.status(200).json({
            message: 'Coordenadas obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las coordenadas.', error });
    }
};

