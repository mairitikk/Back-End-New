// Carga de protocolo http
import { createServer } from 'http';

// Carga de aplicación de express
import app from './src/app.mjs';

// Carga de variables de entorno
import dotenv from 'dotenv';
dotenv.config();

// Configuracion de bbdd
import './src/config/db.mjs';

// Creación del servidor
const server = createServer(app);

// Definición del puerto
const PORT = process.env.PORT || 3000;

// Arranque del servidor
server.listen(PORT);

// Handler de eventos del servidor
server.on('listening', () => console.log(`Server running on port: ${PORT}`));
server.on('error', (error) => console.log(error));