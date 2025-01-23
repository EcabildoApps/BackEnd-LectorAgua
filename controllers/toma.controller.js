const db = require('../models');

// Función para obtener todos los datos
exports.obtenerDatos = async (req, res) => {
    try {
        // Realizar la consulta en la base de datos sin necesidad de parámetros
        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.AGUALEC_APP`,
            {
                type: db.Sequelize.QueryTypes.SELECT,
            }
        );

        // Verificar si la consulta tiene resultados
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron registros.' });
        }

        // Devolver los resultados encontrados
        return res.status(200).json({
            message: 'Consulta exitosa.',
            data: result,  // Devolver los datos obtenidos
        });
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        return res.status(500).json({ message: 'Error del servidor.', error: error.message || error });
    }
};

