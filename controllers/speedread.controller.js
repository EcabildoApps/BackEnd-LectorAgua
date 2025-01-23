const db = require('../models');

// Función para manejar la consulta del medidor
exports.cuentaRoutes = async (req, res) => {
    const { cuenta } = req.query; // Obtener el parámetro medido desde la query string (GET)

    try {
        // Validar que el parámetro 'cuenta' esté presente
        if (!cuenta) {
            return res.status(400).json({ message: 'Falta el parámetro nro_cuenta.' });
        }

        // Realizar la consulta en la base de datos
        const result = await db.sequelize.query(
            `SELECT * FROM ERPSPP.AGUALEC_APP WHERE NRO_CUENTA = :cuenta`,
            {
                replacements: { cuenta },
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
