const mongoose=require('mongoose')

const foodSchema=new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String
   
})


const foodModel=mongoose.models.food||mongoose.model("food", foodSchema)
module.exports=foodModel