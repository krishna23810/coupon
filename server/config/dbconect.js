const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
  try {
    dotenv.config();  
    await mongoose.connect(process.env.MONGO_URI );
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
module.exports = connectDB;
