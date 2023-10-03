import { Server } from 'socket.io';
import colors from 'colors';

const configureSocket = (httpServer) => {
  const io = new Server(httpServer);
  let messages = [];

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado:", colors.magenta(socket.id));

    socket.on('message', data => {
      messages.push(data)
      io.emit('messageLogs', messages)
    });
  });

  return io;
};

export default configureSocket;