const mongoose = require("mongoose");
require('dotenv').config()

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully...");
  } catch (err) {
    console.log("Database connection failed:", err);
  }
};

module.exports = connectToDB