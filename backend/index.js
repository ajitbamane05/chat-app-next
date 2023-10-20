require('dotenv').config({path:'./.env'})
const express = require('express')
const cors = require('cors');
const helmet = require('helmet');

const app = express()
app.use(helmet());

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
app.use(express.json())
const corsOptions = {
    origin:['http://localhost:3001','http://chat-app-pro.site','http://www.chat-app-pro.site'],
    optionsSuccessStatus: 200,
    exposedHeaders: ['Authorization']
}
app.use(cors(corsOptions));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    res.status(200).json({message:"Hello from backend"})
})

app.use('/', authRoutes);
app.use('/user', userRoutes);
app.use('/chat', chatRoutes);
app.use('/room', roomRoutes);

app.listen(3000, () => {
    console.log('Listning on port 3000');
})