const db = require('../models');

exports.correctRoutes = async (req, res) => {
    const { ruta, filtros, valor } = req.query; // Obtener parámetros desde la query string

    try {
        // Validar que el parámetro obligatorio "ruta" esté presente
        if (!ruta) {
            return res.status(400).json({ message: 'El parámetro "ruta" es obligatorio.' });
        }

        // Si no se especifican filtros, devolver todos los registros de la ruta
        if (!filtros) {
            const result = await db.sequelize.query(
                `SELECT * FROM ERPSPP.AGUALEC_APP WHERE RUTA = :ruta`,
                {
                    replacements: { ruta },
                    type: db.Sequelize.QueryTypes.SELECT,
                }
            );
            return res.status(200).json({
                message: 'Consulta exitosa.',
                data: result,
            });
        }

        // Construir la condición dinámica para los filtros
        const filtrosArray = filtros.split(',').map(f => f.trim().toLowerCase());
        const condiciones = [];
        const replacements = { ruta };

        // Mapear las columnas de la base de datos a sus respectivos filtros
        const columnas = {
            cuenta: 'NRO_CUENTA',
            medidor: 'NRO_MEDIDOR',
            nombres: 'CONSUMIDOR',
        };

        // Para cada filtro, verificamos si es válido y agregamos la condición correspondiente
        filtrosArray.forEach((filtro, index) => {
            const columna = columnas[filtro];
            if (columna) {
                const parametro = `valor${index}`;
                condiciones.push(`${columna} LIKE :${parametro}`);
                replacements[parametro] = `%${valor || ''}%`; // Usar el valor del filtro o vacío si no se proporciona
            }
        });

        // Validar que haya al menos un filtro válido
        if (condiciones.length === 0) {
            return res.status(400).json({
                message: 'Ningún filtro válido fue proporcionado. Los filtros válidos son: cuenta, medidor, nombres.',
            });
        }

        // Construir la consulta SQL con las condiciones dinámicas
        const whereClause = condiciones.join(' OR ');
        const query = `
            SELECT * 
            FROM ERPSPP.AGUALEC_APP 
            WHERE RUTA = :ruta AND (${whereClause})
        `;

        // Ejecutar la consulta
        const result = await db.sequelize.query(query, {
            replacements,
            type: db.Sequelize.QueryTypes.SELECT,
        });

        // Verificar si la consulta tiene resultados
        if (result.length === 0) {
            return res.status(404).json({ message: `No se encontraron resultados.` });
        }

        // Devolver los resultados encontrados
        return res.status(200).json({
            message: 'Consulta exitosa.',
            data: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error del servidor.', error });
    }
};