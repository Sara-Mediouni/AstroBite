const express= require ('express');
const {loginUser, registerUser, getUser }= require ('../Controllers/UserController')


const userRouter=express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getuser/:id',getUser)



module.exports=userRouter