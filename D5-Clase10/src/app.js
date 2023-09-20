//require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log('Server running on ' + `http://localhost:${PORT}/`);
});

const socketServer = new Server(httpServer);

app.engine('handlebars', engine());
const viewsPath = path.join(__dirname, '/views');
app.set('views', viewsPath);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '/public' )));
app.use(express.json())
app.use(morgan('tiny'));

const routes = require('./routes');
app.use('/', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

socketServer.on('connection', socket => {
  console.log("Nuevo cliente conectado");
});