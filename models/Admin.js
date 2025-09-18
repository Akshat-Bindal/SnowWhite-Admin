import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain text
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Admin", AdminSchema);
