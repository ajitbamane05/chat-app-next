require('dotenv').config({path:'./.env'})
const express = require('express')
const cors = require('cors');
const app = express()
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
app.use(express.json())
const crosOptions = {
    origin:'http://localhost:3001',
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization']
}
app.use(cors(crosOptions));

app.get('/', (req, res) => {
    res.status(200).json({message:"Hello from backend"})
})

app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/room', roomRoutes);

app.listen(3000, () => {
    console.log('Listning on port 3000');
})