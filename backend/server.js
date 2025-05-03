const express = require('express')
const cors = require('cors')
const {connectDB} =require ('./db.js');
const env=require ('dotenv/config');
const userRouter = require('./Routes/UserRoutes.js');
const foodRoutes = require('./Routes/FoodRoutes.js');
const orderRouter = require('./Routes/orderRoutes.js');
const app=express();

const port=4000



app.use('/uploads', express.static('uploads'));
// Puis seulement après, tu mets express.json() pour tout le reste
app.use(express.json())
app.use(cors())

connectDB();


app.use('/api/food',foodRoutes);
app.use('/api/user',userRouter)
app.use('/api/order',orderRouter)
app.use((err, req, res, next) => {
    console.error(err.stack); // pour voir l'erreur dans le terminal
    res.status(500).json({ error: 'Une erreur est survenue sur le serveur.' });
  });
app.get("/",(req,res)=>{
res.send("API Working")
})
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}` )
})