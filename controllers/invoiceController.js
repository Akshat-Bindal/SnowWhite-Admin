import mongoose from "mongoose";
import Invoice from "../models/Invoice.js";

// Create Invoice
export const createInvoice = async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, deliveryDate, items, tax = 0, discount = 0 } = req.body;

    if (!customerName || !customerPhone || !deliveryDate || !items?.length) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let subtotal = 0;
    const formattedItems = items.map((item) => {
      const amount = item.qty * item.price;
      subtotal += amount;
      return { ...item, amount };
    });

    const total = subtotal + (subtotal * tax) / 100 - discount;

    const invoice = new Invoice({
      customerName,
      customerPhone,
      customerAddress,
      deliveryDate,
      items: formattedItems,
      subtotal,
      tax,
      discount,
      total: total < 0 ? 0 : total
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all invoices with pagination
export const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const invoices = await Invoice.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Invoice.countDocuments();
    res.json({ invoices, total });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid invoice ID" });
    }

    const invoice = await Invoice.findById(id);
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update invoice status
export const updateInvoiceStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Processing", "Completed", "Delivered"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const invoice = await Invoice.findByIdAndUpdate(id, { status }, { new: true });
    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndDelete(id);

    if (!invoice) return res.status(404).json({ error: "Invoice not found" });

    res.json({ message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
