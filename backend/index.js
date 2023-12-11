require('dotenv').config({ path: './.env' })
const express = require('express')
const { createServer } = require("node:http");
const helmet = require('helmet');
const { Server } = require("socket.io");
const cors = require('cors')
const app = express()
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3001", "https://chat-app-pro.site", "https://www.chat-app-pro.site"],
        credentials: true
    }
});

app.use(helmet());
const environment = process.env.NODE_ENV || 'development';
const dev = environment === 'development'
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
app.use(express.json())
const corsOptions = {
    origin: ['http://localhost:3001', 'https://chat-app-pro.site', 'https://www.chat-app-pro.site'],
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

app.use(dev ? '/api/' : '/', authRoutes);
app.use(dev ? '/api/user' : '/user', userRoutes);
app.use(dev ? '/api/chat' : '/chat', chatRoutes);
app.use(dev ? '/api/room' : '/room', roomRoutes);

io.on('connection', (socket) => {
    socket.on('joinRoom', (roomId, senderId) => {
        socket.join(roomId);
        // console.log("joined room",senderId);
        // console.log(`User ${senderId} joined room ${roomId}`);
    });

    // Leave a specific room
    socket.on('leaveRoom', (roomId, senderId,) => {
        socket.leave(roomId);
        // console.log("Left room",senderId);
        // console.log(`User ${senderId} left room ${roomId}`);
    });


    socket.on('chat', (payload) => {
        // console.log('Received a chat message', payload);
        // Ensure payload has the roomId
        if (!payload.roomId) {
            console.error('No roomId specified in payload');
            return;
        }
        // Broadcast the message only to that specific room
        io.to(payload.roomId).emit("chat", payload);
    });
});

server.listen(3000, () => {
    console.log('Listning on port 3000');
})