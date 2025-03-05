const db = require('../models');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan datos: username o password.' });
        }

        const user = await db.sequelize.query(
            `SELECT 
                A.RUTA, 
                A.APPROL, 
                B.TPPREDIO, 
                B.GEOCODIGO
            FROM 
                ERPSPP.AGUAUSER_APP A
            LEFT JOIN 
                ERPSPP.APP_PREPLANIFICA B
            ON 
                A.SEG03CODI = B.SEG03CODI
            WHERE 
                A.SEG03CODI = :username
                AND A.SEG03CLA = :password;`,
            {
                replacements: { username, password },
                type: db.Sequelize.QueryTypes.SELECT,
            }
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        const userRole = user[0].APPROL;

        // Validación para el rol LEC (lectura de agua)
        if (userRole === 'LEC') {
            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                user: user[0],
            });
        }

        // Validación para el rol URB (predios urbanos)
        if (userRole === 'URB' ) {
            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                user: user[0],
            });
        }

        if (userRole === 'RUR' ) {
            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                user: user[0],
            });
        }

        if (userRole === 'ADM' ) {
            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                user: user[0],
            });
        }

        // Si el rol no es LEC ni el predio es válido para URB
        return res.status(403).json({ message: 'Acceso denegado: Rol o predio no autorizado.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};
