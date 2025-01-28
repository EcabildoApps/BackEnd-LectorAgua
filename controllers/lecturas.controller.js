'use strict';

const db = require('../models'); // Aquí se importa el modelo que contiene la configuración de Sequelize

exports.obtenerLecturas = async (req, res) => {
    try {
        // Obtener el parámetro 'ruta' de la query string
        const { ruta } = req.query;

        if (!ruta) {
            return res.status(400).json({ message: 'Falta el parámetro ruta.' });
        }

        // Realizar la consulta a la base de datos Oracle
        const result = await db.sequelize.query(
            `SELECT * FROM AGUALEC_APP WHERE RUTA = :ruta`, {
            replacements: { ruta },
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron lecturas para el número de ruta proporcionado.' });
        }

        // Devolver los resultados de la consulta en formato JSON
        return res.status(200).json({
            message: 'Lecturas obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las lecturas.', error });
    }
};

// Función para insertar o actualizar lecturas
exports.guardarLectura = async (req, res) => {
    const lectura = req.body; // Suponemos que la lectura es enviada en el cuerpo de la solicitud

    try {
        // Valida que la lectura tenga los campos necesarios
        if (!lectura || !lectura.IDCUENTA || !lectura.NRO_CUENTA) {
            return res.status(400).json({ message: 'Faltan datos en la lectura proporcionada.' });
        }

        // Inserta o actualiza la lectura en la base de datos
        await db.sequelize.query(
            `INSERT INTO AGUALEC_APP (
                IDCUENTA, NRO_CUENTA, NRO_MEDIDOR, CIU, CONSUMIDOR, CEDULA_RUC, EMAIL,
                PARROQUIA, SECTOR, RUTA, SEQUENCIA, DIRECCION, CLAVE_PREDIO, ESTADO,
                STATUS, TARIFA, ALCANTARILLADO, LECT_ACTUAL, LECT_ANTERIOR, CONSUMO_PROMEDIO,
                CONSUMO_CONTROL_MIN, CONSUMO_CONTROL_MAX, CONSUMO, EXONERACION, TERCERA_EDAD,
                DISCAPACIDAD, DEPARTAMENTO, PISO, MANZANA, TIPO, ANIOMES, ACTIVO, USER_LEC,
                FECHA_LEC, X_LECTURA, Y_LECTURA, X_MEDIDOR, Y_MEDIDOR, TIPOCAUSA, LEC04ID,
                FECHA_STRING_LEC, FTOMA, PORCENTAGE_CON_PROMEDIO, TIPONOVEDAD
            ) VALUES (
                :IDCUENTA, :NRO_CUENTA, :NRO_MEDIDOR, :CIU, :CONSUMIDOR, :CEDULA_RUC, :EMAIL,
                :PARROQUIA, :SECTOR, :RUTA, :SEQUENCIA, :DIRECCION, :CLAVE_PREDIO, :ESTADO,
                :STATUS, :TARIFA, :ALCANTARILLADO, :LECT_ACTUAL, :LECT_ANTERIOR, :CONSUMO_PROMEDIO,
                :CONSUMO_CONTROL_MIN, :CONSUMO_CONTROL_MAX, :CONSUMO, :EXONERACION, :TERCERA_EDAD,
                :DISCAPACIDAD, :DEPARTAMENTO, :PISO, :MANZANA, :TIPO, :ANIOMES, :ACTIVO, :USER_LEC,
                :FECHA_LEC, :X_LECTURA, :Y_LECTURA, :X_MEDIDOR, :Y_MEDIDOR, :TIPOCAUSA, :LEC04ID,
                :FECHA_STRING_LEC, :FTOMA, :PORCENTAGE_CON_PROMEDIO, :TIPONOVEDAD
            )`,
            {
                replacements: lectura
            }
        );

        return res.status(200).json({ message: 'Lectura guardada correctamente.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al guardar la lectura.', error });
    }
};

exports.obtenerNovedades = async (req, res) => {

    try {


        // Realizar la consulta a la base de datos Oracle
        const result = await db.sequelize.query(
            `SELECT REN21CODI, REN21DESC, REN20CODI FROM REN21 WHERE REN20CODI = '323'`, {
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        // Devolver los resultados de la consulta en formato JSON
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


        // Realizar la consulta a la base de datos Oracle
        const result = await db.sequelize.query(
            `SELECT REN21CODI, REN21DESC, REN20CODI FROM REN21 WHERE REN20CODI = '627'`, {
            type: db.Sequelize.QueryTypes.SELECT
        }
        );

        // Devolver los resultados de la consulta en formato JSON
        return res.status(200).json({
            message: 'Causas obtenidas correctamente.',
            data: result
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las causas.', error });
    }

};