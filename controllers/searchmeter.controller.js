const db = require('../models');

// Función para manejar la consulta del medidor
exports.medidorRoutes = async (req, res) => {
    const { medidor } = req.query; // Obtener el parámetro medido desde la query string (GET)

    try {
        // Validar que el parámetro 'medidoR' esté presente
        if (!medidor) {
            return res.status(400).json({ message: 'Falta el parámetro nro_medidor.' });
        }

        // Realizar la consulta en la base de datos
        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.AGUALEC_APP WHERE NRO_MEDIDOR = :medidor`,
            {
                replacements: { medidor },
                type: db.Sequelize.QueryTypes.SELECT,
            }
        );

        // Verificar si la consulta tiene resultados
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron resultados para el medido especificado.' });
        }

        // Devolver los resultados encontrados
        return res.status(200).json({
            message: 'Consulta exitosa.',
            data: result,  // Devolver los datos
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};
