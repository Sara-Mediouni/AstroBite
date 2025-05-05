// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/UserRoutes');
const { ErrorHandler } = require('./middleware/ErrorHandler');
const { connectDB } = require('../db');
const env=require ('dotenv/config');
const cors = require('cors')
app.use(cors());
app.use(bodyParser.json()); // Pour parser les données JSON
app.use('/user', userRoutes); // Chaque service a son propre préfixe d'API
app.use(ErrorHandler);


const PORT = 4001;
connectDB();
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});
