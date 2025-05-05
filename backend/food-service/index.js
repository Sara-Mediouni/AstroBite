// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const foodRoutes = require('./Routes/FoodRoutes');
const { ErrorHandler } = require('./middleware/ErrorHandler');
const { connectDB } = require('../db');
const cors = require('cors')

const env=require ('dotenv/config');
const morgan = require('morgan');
app.use(bodyParser.json()); // Pour parser les données JSON
app.use('/food', foodRoutes); // Chaque service a son propre préfixe d'API
app.use(ErrorHandler);
app.use(cors());
const PORT = 4003;
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
connectDB();
app.listen(PORT, () => {
  console.log(`Food Service running on port ${PORT}`);
});
