const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // Allow this origin to access
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

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

server.listen(3002, () => {
  console.log('server running at http://localhost:3002');
});