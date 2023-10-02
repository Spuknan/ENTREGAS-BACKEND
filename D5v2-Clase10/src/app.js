import express from 'express';
import { __dirname } from './utils.js';
import colors from 'colors';
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import entryPointRouter from './routes/entryPoint.routes.js';


const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on`, colors.cyan(`http://localhost:${PORT}`));
});

// Socket server
export const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", colors.magenta(socket.id));
});

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use('/', entryPointRouter);
app.use(morgan('dev'));