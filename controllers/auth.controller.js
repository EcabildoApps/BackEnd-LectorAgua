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
            JOIN 
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

        return res.status(200).json({
            message: 'Inicio de sesión exitoso.',
            user: user[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};
