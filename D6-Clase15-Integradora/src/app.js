import express from 'express';
import mongoConnect from './dao/mongodb/mongoConnect.js';
import 'dotenv/config'
import { __dirname } from './utils.js';
import colors from 'colors';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import routes from './routes/routes.js';
import configureSocket from './socketHandler.js';

// express server
const app = express();
const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on`, colors.cyan(`http://localhost:${PORT}`));
});

// Respuestas en formato json
app.use(express.json());

// Conexión a la base de datos
mongoConnect;

// Socket server
const io = configureSocket(httpServer);

// Views
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));

// Entry point para las rutas
app.use('/', routes);

// Logger
app.use(morgan('dev'));
