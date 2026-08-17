const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Database connected successfully');
  } catch (err) {
    console.log('Database connection failed:', err.message);
  }
};

module.exports = connectDB;
