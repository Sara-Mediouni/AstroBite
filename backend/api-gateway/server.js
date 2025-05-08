const express = require('express')
const cors = require('cors')
const env=require ('dotenv/config');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Correct import
const helmet = require("helmet");
const morgan=require('morgan');
const { ErrorHandler } = require('./middleware/ErrorHandler.js');

const app=express();
app.use(cors());

app.use('/user', createProxyMiddleware({ target: process.env.USER_SERVICE_URL, changeOrigin: true }));
app.use('/order', createProxyMiddleware({ target: process.env.ORDER_SERVICE_URL, changeOrigin: true }));
app.use('/food', createProxyMiddleware({ target: process.env.FOOD_SERVICE_URL, changeOrigin: true }));



const port=4000

// enabling the Helmet middleware


app.use('/uploads', express.static('uploads'));
// Puis seulement après, tu mets express.json() pour tout le reste
app.use(express.json())
app.use(helmet());

app.use(morgan('dev'));




app.use(ErrorHandler);

app.listen(port,()=>{
    console.log(`API gateway started on ${port}` )
})