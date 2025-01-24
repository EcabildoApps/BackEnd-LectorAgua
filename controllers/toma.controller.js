const db = require('../models');

// Función para obtener datos filtrados por IDCUENTA
exports.obtenerDatos = async (req, res) => {
    const { IDCUENTA } = req.query; // Obtenemos el IDCUENTA desde la URL o req.body según lo que prefieras

    try {
        // Verificar si se proporcionó el parámetro IDCUENTA
        if (!IDCUENTA) {
            return res.status(400).json({ message: 'El parámetro IDCUENTA es requerido.' });
        }

        // Realizar la consulta en la base de datos utilizando el parámetro IDCUENTA
        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.AGUALEC_APP WHERE IDCUENTA = :IDCUENTA`,
            {
                replacements: { IDCUENTA }, // Pasamos el parámetro de forma segura
                type: db.Sequelize.QueryTypes.SELECT,
            }
        );

        // Verificar si la consulta tiene resultados
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros para el IDCUENTA proporcionado.' });
        }

        // Devolver los resultados encontrados
        return res.status(200).json({
            message: 'Consulta exitosa.',
            data: result, // Devolver los datos obtenidos
        });
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message || error });
    }
};


