const path = require('path');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? path.resolve(__dirname, '../.env.test') : path.resolve(__dirname, '../.env')
});

const express = require('express');
const app = express();
const userRoutes = require('./Routes/UserRoutes');
const { ErrorHandler } = require('./middleware/ErrorHandler');
const { connectDB } = require('./db');


const cors = require('cors')
app.use(cors());
app.use(express.json());
 // Pour parser les données JSON
app.use('/user', userRoutes);
 // Chaque service a son propre préfixe d'API
app.use(ErrorHandler);

const port = process.env.PORT||4000;


module.exports = {app,connectDB};