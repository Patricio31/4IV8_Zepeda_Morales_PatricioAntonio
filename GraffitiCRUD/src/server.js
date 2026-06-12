const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, '..', 'public')));

const artistasRouter = require('./Routers/artistas');
const estilosRouter = require('./Routers/murales');   
const graffosRouter = require('./Routers/bocetos');   

app.use('/api/artistas', artistasRouter);
app.use('/api/estilos', estilosRouter);
app.use('/api/graffos', graffosRouter);

app.use('/api/*path', (req, res) => {
    res.status(404).json({
        status : 'error',
        message : 'Ruta no encontrada'
    });
});

app.use((err, req, res, next) => {
    console.log('error no manejado: ', err.message);
    res.status(500).json({
        status : 'error',
        message : 'Error interno del servidor'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor inicializado en el puerto ${PORT}`);
});