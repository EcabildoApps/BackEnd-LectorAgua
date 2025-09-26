const db = require('../models');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Faltan datos: username o password.' });
        }

        const users = await db.sequelize.query(
            `SELECT 
                A.RUTA, 
                A.APPROL, 
                B.TPPREDIO, 
                B.GEOCODIGO
            FROM 
                ERPGMPTE.AGUAUSER_APP A
            LEFT JOIN 
                ERPGMPTE.APP_PREPLANIFICA B
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

        if (users.length === 0) {
            return res.status(404).json({ message: 'Usuario o contraseña incorrectos.' });
        }

        // Tomar el rol del primer registro (todos deben tener el mismo rol)
        const userRole = users[0].APPROL;

        // Preparar respuesta agrupando rutas
        const userData = {
            username,
            role: userRole,
            rutas: users.map(u => ({
                ruta: u.RUTA,
                tppredio: u.TPPREDIO,
                geocodigo: u.GEOCODIGO
            }))
        };

        // Validaciones de rol
        if (['LEC', 'URB', 'RUR', 'ADM'].includes(userRole)) {
            return res.status(200).json({
                message: 'Inicio de sesión exitoso.',
                user: userData,
            });
        }

        return res.status(403).json({ message: 'Acceso denegado: Rol o predio no autorizado.' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};
