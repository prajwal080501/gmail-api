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

// Allow all origins for development (NOT for production)
app.use(cors({
  origin: true,
  credentials: true
}));

// Your existing middleware
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Welcome to Gmail API with NodeJS');
});

app.use('/api', routes);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});