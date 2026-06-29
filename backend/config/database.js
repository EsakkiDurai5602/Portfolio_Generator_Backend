const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`✗ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = connectDB;
