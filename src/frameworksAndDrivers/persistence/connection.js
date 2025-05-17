const mongoose = require("mongoose");
const { uri, options } = require("../../config/database.js");

async function connectDB() {
  try {
    await mongoose.connect(uri, options);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }
}
module.exports = connectDB;
