import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";


(async () => {
  try {
    await connectDB();

    const username = process.env.ADMIN_USERNAME 
    const password = process.env.ADMIN_PASSWORD 

    const exist = await Admin.findOne({ username });
    if (exist) {
      console.log("Admin already exists:", username);
      process.exit(0);
    }

    const admin = new Admin({ username, password });
    await admin.save();
    console.log("Admin created:", username);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
