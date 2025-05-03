const orderModel = require("../Models/orderModel.js");
const userModel = require("../Models/User");
const Stripe = require("stripe");
const mongoose=require('mongoose')
const stripe = new Stripe(
  process.env.STRIPE_API_KEY
);
//placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5174";
  try {
    const newOrder = new orderModel({
      userId:new mongoose.Types.ObjectId(req.body.userId),
      items: req.body.items.map(item => ({
        item:new mongoose.Types.ObjectId(item._id),  // Conversion en ObjectId
        size: item.size,
        topping: item.topping,
        quantity: item.quantity
      })),
      amount: req.body.amount
    });
  

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount:  Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
    console.log(newOrder);
    await newOrder.save();
  } catch (error) {
    console.log({ success: false, message: "error", error });
  }
};
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true, message:"Paid"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false, message:"Not Paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"});
  }
};

//user orders for frontend
const userOrders=async (req, res)=>{
    try{
       const orders=await orderModel.find({userId:req.params.userId}).populate("items.item")
       res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


//Listing orders for admin panel
const listOrders=async(req, res)=>{
      try{
       const orders=await orderModel.find().populate("userId").populate("items.item");
       res.json({success:true, data:orders})
      }
      catch(error){
       console.log(error);
       res.json({success:false, message:"Error"})
      }
}
//api for updating order status
const updateStatus=async(req, res)=>{
      try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message:"Status updated"})
      }catch(error){
         console.log(error);
         res.json({success:false, message:"Error updating status"})
      }
}

module.exports = { listOrders, placeOrder, verifyOrder,updateStatus , userOrders };
