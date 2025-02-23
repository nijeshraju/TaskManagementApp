/**
 * db.js
 * @description :: exports database connection using mongoose
 */
const mongoose = require("mongoose");

const uri = process.env.DB_URL || "mongodb://localhost:27017/taskdb";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

connectDB();
