const mongoose=require('mongoose')
const orderSchema=new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, ref:"user",required:true},
    items:[
    {item:{type:mongoose.Types.ObjectId,ref:"food"},
    size:String,
    topping:String ,
    quantity:Number }],
    amount:{type:Number, required:true},
    status:{type:String, default:"Pending"},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false}

}, { timestamps: true })

const orderModel=mongoose.models.order || mongoose.model("order",orderSchema)
module.exports=orderModel