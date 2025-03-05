const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const db = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const path = require('path');
require('dotenv').config();

const options = {
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key'), 'utf8'),  
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'fullchain.pem'), 'utf8')
};


app.use(cors({
    origin: '*',  // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization']  // Cabeceras permitidas
}));


app.use('/uploadsLogin', express.static(path.join(__dirname, '/uploadsLogin')));

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
});


// Iniciar servidor
https.createServer(options, app).listen(process.env.PORT || 3000, () => {
    console.log(`Servidor HTTPS corriendo en puerto: ${process.env.PORT || 3000} en modo ${process.env.NODE_ENV}`);
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
