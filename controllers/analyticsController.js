import Invoice from "../models/Invoice.js";
import mongoose from "mongoose";

export const getDashboardAnalytics = async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Invoice.countDocuments();

    // Delivered Orders
    const deliveredOrders = await Invoice.countDocuments({ status: "Delivered" });

    // Pending Orders
    const pendingOrders = await Invoice.countDocuments({ status: "Pending" });

    // Total Revenue
    const revenueAgg = await Invoice.aggregate([
      { $group: { _id: null, revenue: { $sum: "$total" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.revenue || 0;

    // Total Customers (unique phone or name)
    const customersAgg = await Invoice.distinct("customerPhone");
    const totalCustomers = customersAgg.length;

    // Orders by Laundry Type
    const typeAgg = await Invoice.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.laundryType",
          count: { $sum: "$items.qty" } // you can use qty or orders
        }
      }
    ]);

    // Format into required output
    const result = {
      totalOrders,
      deliveredOrders,
      pendingOrders,
      totalRevenue,
      totalCustomers,
      laundryTypes: {
        wash: typeAgg.find(t => t._id === "wash")?.count || 0,
        iron: typeAgg.find(t => t._id === "iron")?.count || 0,
        dry: typeAgg.find(t => t._id === "dry")?.count || 0,
        "wash & iron": typeAgg.find(t => t._id === "Wash & Iron")?.count || 0
      }
    };

    res.json(result);
  } catch (err) {
    console.error("Analytics API Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
