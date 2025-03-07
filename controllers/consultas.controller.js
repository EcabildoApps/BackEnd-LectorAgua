const db = require('../models');

exports.loginC = async (req, res) => {
    const { username } = req.body;

    try {
        if (!username ) {
            return res.status(400).json({ message: 'Faltan datos: username.' });
        }

        const user = await db.sequelize.query(
            `SELECT SEG03CODI, SEG03COM FROM ERPSPP.ST_SEG03 WHERE SEG03CODI = :username`,
            {
                replacements: { username, },
                type: db.Sequelize.QueryTypes.SELECT,
            }
        );

        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario incorrectos.' });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};
