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
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'certificado .crt'))
};

if (!options.key || !options.cert) {
    console.error("Error al leer los archivos de certificado.");
    process.exit(1); // Salir si hay un problema con los certificados
}else{
    console.log("Certificados cargados correctamente.");
}

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

const httpsServer = https.createServer(options, app);


// Iniciar servidor
httpsServer.listen(port, () => {
    console.log(`Servidor HTTPS corriendo en puerto: ${port} en modo ${process.env.NODE_ENV}`);
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
