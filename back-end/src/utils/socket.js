const { Server } = require('socket.io');

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`Nouvelle connexion : ${socket.id}`);
    socket.on('disconnect', () => {
      console.log(`❌ Déconnecté :(${socket.id})`);
    });
  });

  return io;
}

module.exports = initSocket;
