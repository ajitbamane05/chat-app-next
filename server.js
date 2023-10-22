const { createServer } = require('node:http');
const { Server } = require('socket.io'); 

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "https://chat-app-pro.site"], // Allow this origin to access
    methods: ["GET", "POST"]
  }
});


io.on('connection', (socket) => {
   socket.on('joinRoom', (roomId,senderId) => {
    socket.join(roomId);
    // console.log(`User ${senderId} joined room ${roomId}`);
  });

  // Leave a specific room
  socket.on('leaveRoom', (roomId,senderId) => {
    socket.leave(roomId);
    // console.log(`User ${senderId} left room ${roomId}`);
  });


  socket.on('chat', (payload) => {
    console.log('Received a chat message', payload);
    // Ensure payload has the roomId
    if(!payload.roomId) {
      console.error('No roomId specified in payload');
      return;
    }
    // Broadcast the message only to that specific room
    io.to(payload.roomId).emit("chat", payload);
  });
});


server.listen(3002, () => {
  console.log('server running at http://localhost:3002');
});