import { connectToDB } from "/lib/mongodb";
import User from "/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDB();
    console.log("📌 DB connected in SignUp");

    const { name, email, password } = req.body;
    console.log("📌 Request body:", { name, email });

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("✅ User created:", newUser._id);

    return res.status(201).json({ message: "User registered successfully ✅" });
  } catch (err) {
    console.error("❌ SignUp error:", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
