const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

app.use(cors());

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
});


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
});

// Conectar con la base de datos
db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
        console.error('No se puede conectar a la base de datos:', err);
    });
