// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const orderRoutes = require('./Routes/orderRoutes');
const { ErrorHandler } = require('./middlewares/ErrorHandler');
const { connectDB } = require('./db');
const env=require ('dotenv/config');
const cors = require('cors')

app.use(bodyParser.json()); // Pour parser les données JSON
app.use('/order', orderRoutes); // Chaque service a son propre préfixe d'API
app.use(ErrorHandler);
app.use(cors())
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Orders Service running on port ${process.env.PORT}`);
});
