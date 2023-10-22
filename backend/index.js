require('dotenv').config({ path: './.env' })
const express = require('express')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001", "https://chat-app-pro.site"], // Allow this origin to access
        methods: ["GET", "POST"]
    }
});
app.use(helmet());
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
app.use(express.json())
const corsOptions = {
    origin: ['http://localhost:3001', 'http://chat-app-pro.site', 'http://www.chat-app-pro.site'],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization']
}
app.use(cors(corsOptions));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello from backend" })
})

app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/room', roomRoutes);


io.on('connection', (socket) => {
    socket.on('joinRoom', (roomId, senderId) => {
        socket.join(roomId);
        console.log(`User ${senderId} joined room ${roomId}`);
    });

    // Leave a specific room
    socket.on('leaveRoom', (roomId, senderId) => {
        socket.leave(roomId);
        // console.log(`User ${senderId} left room ${roomId}`);
    });


    socket.on('chat', (payload) => {
        console.log('Received a chat message', payload);
        // Ensure payload has the roomId
        if (!payload.roomId) {
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

app.listen(3000, () => {
    console.log('Listning on port 3000');
})