require('dotenv').config();
const mongoose=require ("mongoose");

const connectDB = async () => {
  const uri = process.env.NODE_ENV === 'test'
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports={connectDB}