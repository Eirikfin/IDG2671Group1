import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection successful!");
  } catch (err) {
    console.log("Database connection error:", err);
  }
};

connectDB();
