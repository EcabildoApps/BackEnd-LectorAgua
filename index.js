const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes'); // Rutas importadas correctamente

app.use(cors());

// Middleware para analizar JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});

// Conectar con la base de datos
db.sequelize
    .sync({ force: false }) // Cambié `force: true` a `force: false` para evitar borrar la base de datos al reiniciar el servidor
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });
