import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import colors from 'colors';
import { dbConnect } from './utils/dbConnect';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(morgan('tiny'));

// Entry point para las rutas

// Conexión a base de datos MongoDB
dbConnect();

// Conexión al servidor de express
const httpServer = app.listen(PORT, () => {
  console.log(`server running on -----> http://localhost:${PORT}`.bgCyan);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});