import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}
