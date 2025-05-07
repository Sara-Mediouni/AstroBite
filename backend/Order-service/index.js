
const express = require('express');
const app = express();
const orderRoutes = require('./Routes/orderRoutes');
const { ErrorHandler } = require('./middlewares/ErrorHandler');
const { connectDB } = require('./db');

const cors = require('cors');
const morgan = require('morgan');

app.use(express.json()); 
app.use('/order', orderRoutes); 
app.use(ErrorHandler);
app.use(cors())
app.use(morgan('dev'));


module.exports = {app,connectDB};