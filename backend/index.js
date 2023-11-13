require('dotenv').config({ path: './.env' })
const express = require('express')
const cors = require('cors');
const helmet = require('helmet');

const app = express()
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

app.listen(3000, () => {
    console.log('Listning on port 3000');
})