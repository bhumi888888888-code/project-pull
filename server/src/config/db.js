import mongoose from "mongoose";
import { ENV } from "../lib/ENV.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI,{family: 4 });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to MongoDB:`,error);
    process.exit(1);
  }
};
