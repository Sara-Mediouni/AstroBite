const express=require('express')

const {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}=require('../Controllers/orderController.js');
const authMiddleware = require('../middleware/auth.js');


const orderRouter=express.Router();


orderRouter.post('/place',placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.get('/userorders/:userId',authMiddleware,userOrders);
orderRouter.get('/list',authMiddleware, listOrders);
orderRouter.post('/status', updateStatus);


module.exports=orderRouter