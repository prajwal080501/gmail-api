const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const routes = require('./routes');

dotenv.config();
const app = express();

// // Allow your frontend Codespace origin
// app.use(cors({
//   origin: true
// }));

app.use(cors({
    origin: [
        'https://redesigned-tribble-vr4rgxrvwx6hp99v-5500.app.github.dev',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.get('/', async (req, res) => {
  res.send('Welcome to Gmail API with NodeJS');
});

app.use('/api', routes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});