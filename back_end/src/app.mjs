/*CommonJS

const express = require('express');
const cors = require('cors');


// Creación de instancia de express app
const app = express();

// Configuración express app
app.use(cors()); // Integración de CORS middleware
app.use(express.json()); // Parsear requests en formato JSON

// Ruta
app.use('/api', require('./routes/api'));

module.exports = app; */



// ECMAScript modules (ESM)

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.mjs';

// Creación de instancia de express app
const app = express();

// Configuración express app
app.use(cors()); // Integración de CORS middleware
app.use(express.json()); // Parsear requests en formato JSON

// Ruta
app.use('/api', apiRoutes);

// Export the app as default
export default app;