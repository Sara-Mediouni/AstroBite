// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const foodRoutes = require('./Routes/FoodRoutes');
const { ErrorHandler } = require('./middleware/ErrorHandler');
const { connectDB } = require('./db');
const cors = require('cors')

const env=require ('dotenv/config');
const morgan = require('morgan');
app.use(bodyParser.json()); // Pour parser les données JSON
app.use('/food', foodRoutes); // Chaque service a son propre préfixe d'API
app.use(ErrorHandler);
app.use(cors());

app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Food Service running on port ${process.env.PORT}`);
});
