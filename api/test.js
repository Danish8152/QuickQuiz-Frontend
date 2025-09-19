import mongoose from "mongoose";

let isConnected = false;

export default async function handler(req, res) {
  if (!isConnected) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      isConnected = true;
      console.log("✅ MongoDB Connected");
    } catch (err) {
      console.error("❌ MongoDB Error:", err);
      return res.status(500).json({ error: "MongoDB connection failed" });
    }
  }

  res.status(200).json({ message: "MongoDB connection successful ✅" });
}
