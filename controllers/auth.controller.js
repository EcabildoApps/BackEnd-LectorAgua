const db = require('../models');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Validar que los datos estén presentes
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan datos: username o password.' });
        }

        // Consulta a la base de datos para buscar el usuario
        const user = await db.sequelize.query(
            `SELECT RUTA FROM ERPSPP.AGUAUSER_APP WHERE SEG03CODI = :username AND SEG03CLA = :password;`,
            {
                replacements: { username, password }, // Sustituir los parámetros
                type: db.Sequelize.QueryTypes.SELECT, // Especifica que es un SELECT
            }
        );

        // Verificar si el usuario existe
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        // Devolver datos del usuario
        return res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            user: user[0], // Retorna solo el primer usuario encontrado
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};
