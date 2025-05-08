
const env=require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const userRoutes = require('./Routes/UserRoutes');
const { ErrorHandler } = require('./middleware/ErrorHandler');
const { connectDB } = require('./db');
const cors = require('cors');
const adminRouter = require('./Routes/AdminRoutes');
const morgan = require('morgan');
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/admin', adminRouter);


app.use(ErrorHandler);




module.exports = {app,connectDB};