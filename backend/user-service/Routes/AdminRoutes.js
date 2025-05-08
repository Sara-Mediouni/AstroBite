const express= require ('express');
const {deleteUser, getAllUsers}= require ('../Controllers/UserController');

const { authMiddleware } = require('../middleware/auth');
const { loginAdmin } = require('../../api-gateway/authService/auth-service');

const adminRouter=express.Router();

adminRouter.post('/LoginAdmin',loginAdmin)
adminRouter.delete('/deleteuser/:id',authMiddleware, deleteUser)
adminRouter.get('/getallusers',authMiddleware, getAllUsers)


module.exports=adminRouter