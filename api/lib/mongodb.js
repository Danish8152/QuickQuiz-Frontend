import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is not set in environment variables");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    throw err;
  }
}
