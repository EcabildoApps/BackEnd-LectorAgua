const db = require('../models'); // Importar los modelos de la base de datos

// Función para guardar la toma de lectura
exports.guardarTomaLectura = async (req, res) => {
    const { X_LECTURA, Y_LECTURA, LECT_ACTUAL, IDCUENTA, NRO_CUENTA, RUTA, LECT_ANTERIOR, ANIOMES } = req.body;

    // Validar que los campos obligatorios estén presentes
    if (!X_LECTURA || !Y_LECTURA || !LECT_ACTUAL || !IDCUENTA || !NRO_CUENTA || !RUTA || !LECT_ANTERIOR || !ANIOMES) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }


    // Verificar si el registro ya existe en la base de datos
    const checkExistence = await db.sequelize.query(
        `SELECT 1 FROM ERPSPP.AGUALEC_APP WHERE IDCUENTA = :IDCUENTA AND NRO_CUENTA = :NRO_CUENTA AND RUTA = :RUTA`,
        {
            replacements: { IDCUENTA, NRO_CUENTA, RUTA },
            type: db.Sequelize.QueryTypes.SELECT,
        }
    );

    console.log('Resultado de la verificación de existencia:', checkExistence); // Log para verificar la consulta SELECT

    if (checkExistence.length > 0) {
        // Si el registro existe, actualizamos los campos
        const updateResult = await db.sequelize.query(
            `UPDATE ERPSPP.AGUALEC_APP
                 SET X_LECTURA = :X_LECTURA, Y_LECTURA = :Y_LECTURA, LECT_ACTUAL = :LECT_ACTUAL
                 WHERE IDCUENTA = :IDCUENTA AND NRO_CUENTA = :NRO_CUENTA AND RUTA = :RUTA`,
            {
                replacements: { X_LECTURA, Y_LECTURA, LECT_ACTUAL, IDCUENTA, NRO_CUENTA, RUTA },
                type: db.Sequelize.QueryTypes.UPDATE,
            }
        );

        console.log('Resultado de la actualización:', updateResult); // Log para verificar el resultado de la actualización

        // Si el resultado de la actualización es un arreglo vacío o no tiene filas afectadas, devolvemos error
        if (updateResult && updateResult[1] && updateResult[1].affectedRows === 0) {
            return res.status(404).json({
                message: 'No se encontraron registros para actualizar.',
            });
        }
        

        // Si la actualización fue exitosa, retornamos éxito
        return res.status(200).json({
            message: 'Toma de lectura actualizada con éxito.',
            data: { ...req.body },
        });
    }

};
