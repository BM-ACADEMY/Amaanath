// controllers/mainHeadingController.js
const MainHeading = require("../models/MainHeading");

// Create
const createMainHeading = async (req, res) => {
  try {
    const heading = await MainHeading.create(req.body);
    res.status(201).json(heading);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all
const getMainHeadings = async (req, res) => {
  try {
    const headings = await MainHeading.find();
    res.json(headings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read one
const getMainHeadingById = async (req, res) => {
  try {
    const heading = await MainHeading.findById(req.params.id);
    if (!heading) return res.status(404).json({ message: "Not found" });
    res.json(heading);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateMainHeading = async (req, res) => {
  try {
    const heading = await MainHeading.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(heading);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
const deleteMainHeading = async (req, res) => {
  try {
    await MainHeading.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
  createMainHeading,
  getMainHeadings,
  getMainHeadingById,
  updateMainHeading,
  deleteMainHeading,
};