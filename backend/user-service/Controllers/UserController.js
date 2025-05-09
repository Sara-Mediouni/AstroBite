
require('dotenv').config();
const  userModel=require ("../Models/User");
const  jwt =require ('jsonwebtoken');
const bcrypt =require ('bcrypt');
const validator =require ('validator');



//login user
const loginUser = async (req, res)=>{
    const {email, password}=req.body;
    try{
      const user= await userModel.findOne({email});
    if (!user){
        return res.status(400).json({success:false, message:"User doesn't exist"})
    }
     

    const isMatch=await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({success:false,message:"Invalid credentials" })
    }
    const token= createToken(user._id);
    res.status(200).json({success:true, token})
    }
    catch(error){
      console.log(error);
      res.status(500).json({success:false, message:"Error"})
    }

}
const createToken=(id)=>{
    return jwt.sign(
        { id: id },
        process.env.JWT_SECRET,   
        { expiresIn: '2h' }        
      );
}
//register user
const registerUser = async (req, res)=>{
    const { email, password, fullname,
        phone, address, city}=req.body;
    try{
        //checking is user already exists
        const exists=await userModel.findOne({
            email
        });
        if (exists){
            return res.status(400).json({success:false, message:"User already exists"})
        }
        //validating email format & strong password 
    if (!validator.isEmail(email)){
        return res.status(400).json({success:false, message:"Please enter a valid email"})
    }
    if (password.length<8){
        return res.status(400).json({success:false, message: "Please enter a strong password"})
    }
    //hashing user password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(password, salt);
    const newUser=new userModel({
        
        email:email,
        password:hashedPassword,
        fullname:fullname,
        phone:phone,
        address:address,
        city:city
      
    })
    console.log("new user:",newUser);
    const user=await newUser.save()
    const token =createToken(user._id)
    console.log(token);
    res.status(201).json({success:true, token})
}
    
    catch (error){
        console.error("Error in registerUser:", error);
       res.status(500).json({success:false, error})
    }
}
const getUser=async (req, res)=>{
    
        try{
         const id = req.params.id;
        const user=await userModel.findById(id);
        if (!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        res.status(200).json({success:true, user})
    }
    catch (error){
        console.log(error);
        res.status(500).json({success:false, error})
    }
}
const updateUser=async (req, res)=>{
    const {id}=req.params;
    try{
        const user=await userModel.findById(id);
        console.log("editing with:",req.body)
        if (!user){
            return res.status(400).json({success:false, message:"User not found"})
        }
        //validating email format & strong password 
        else{
        const updatedUser=await userModel.findByIdAndUpdate(id, req.body, {new:true}).select("-password -__v")
        res.status(200).json({success:true, updatedUser})
    }}
    catch (error){
        console.log(error);
        res.status(500).json({success:false, error})
    }
}
const deleteUser=async (req, res)=>{
    const {id}=req.params;
    try{
        console.log("id:",id)
        const user=await
    userModel.findById(id).select("-password -__v")
        if (!user){
            return res.json({success:false, message:"User not found"})
        }
        await userModel.findByIdAndDelete(id)
        res.status(200).json({success:true, message:"User deleted successfully"})
    }
    catch (error){
        console.log(error);
        res.status(500).json({success:false, error})
    }
}
const getAllUsers=async (req, res)=>{
    try{
        const users=await userModel.find().select("-password -__v")
        if (!users){
            return res.json({success:false, message:"No users found"})
        }
        res.status(200).json({success:true, users})
    }
    catch (error){
        console.log(error);
        res.status(500).json({success:false, error})
    }
}
const loginAdmin=async(req, res)=>{
    try{
    const token=await loginAdmin(req.body);
    res.json({ token });
} catch (err) {
  res.status(401).json({ message: err.message });
}}

 

module.exports={loginUser,createToken, registerUser, getUser, updateUser, deleteUser, getAllUsers}