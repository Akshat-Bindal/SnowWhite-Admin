import Service from "../models/Service.js";

// Create service
export const createService = async (req, res) => {
  try {
    const { title, laundryType, originalPrice } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const service = new Service({ title, laundryType, originalPrice });
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, laundryType, originalPrice } = req.body;
    const service = await Service.findByIdAndUpdate(
      id,
      { title, laundryType, originalPrice },
      { new: true }
    );
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
