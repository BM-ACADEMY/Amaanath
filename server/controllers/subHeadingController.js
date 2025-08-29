// controllers/subHeadingController.js
const SubHeading = require("../models/SubHeading.js");

const createSubHeading = async (req, res) => {
  try {
    const subHeading = await SubHeading.create(req.body);
    res.status(201).json(subHeading);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSubHeadings = async (req, res) => {
  try {
    const subHeadings = await SubHeading.find();
    res.json(subHeadings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubHeadingById = async (req, res) => {
  try {
    const subHeading = await SubHeading.findById(req.params.id);
    if (!subHeading) return res.status(404).json({ message: "Not found" });
    res.json(subHeading);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateSubHeading = async (req, res) => {
  try {
    const subHeading = await SubHeading.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(subHeading);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteSubHeading = async (req, res) => {
  try {
    await SubHeading.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createSubHeading,
  getSubHeadings,
  getSubHeadingById,
  updateSubHeading,
  deleteSubHeading,
};
