const express=require("express");
const { listOrders, deleteOrder } = require("../Controllers/orderController");
const { authMiddleware } = require("../middlewares/auth");

const adminRouter=express.Router()



adminRouter.get('/list', authMiddleware ,listOrders);
adminRouter.delete('/:orderId', authMiddleware,deleteOrder)
module.exports=adminRouter
