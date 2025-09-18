import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ error: "username and password required" });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    // plain text comparison
    if (admin.password !== password)
      return res.status(401).json({ error: "Invalid credentials" });

    const payload = { id: admin._id, username: admin.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "12h"
    });

    res.json({
      token,
      admin: { id: admin._id, username: admin.username }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
