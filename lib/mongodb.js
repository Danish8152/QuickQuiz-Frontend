// /lib/mongodb.js
import mongoose from "mongoose";

let isConnected = null;

export async function connectToDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log("🔄 Using existing MongoDB connection");
    return;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is not defined in environment variables");
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected:", isConnected);
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err; // rethrow so API route returns 500 with this error
  }
}
