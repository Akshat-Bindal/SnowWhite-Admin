import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // was "name"
    laundryType: {
      type: String,
      enum: ["Wash", "Iron", "Dry", "Wash & Iron"], // match frontend options
      required: false,
    },
    originalPrice: { type: Number, required: false }, // was "price"
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);
