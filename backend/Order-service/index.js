
const express = require('express');
const app = express();
const orderRoutes = require('./Routes/orderRoutes');
const { ErrorHandler } = require('./middlewares/ErrorHandler');
const { connectDB } = require('./db');

const cors = require('cors')

app.use(express.json()); // Pour parser les données JSON
app.use('/order', orderRoutes); // Chaque service a son propre préfixe d'API
app.use(ErrorHandler);
app.use(cors())



module.exports = {app,connectDB};