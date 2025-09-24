import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  laundryType: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  amount: { type: Number, required: true }
});

const InvoiceSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerAddress: { type: String },

    orderDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date, required: true },

    items: [ItemSchema],

    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Delivered"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", InvoiceSchema);
