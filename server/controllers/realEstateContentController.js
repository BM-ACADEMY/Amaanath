const RealEstateContent = require("../models/RealEstateContent");
const mongoose = require("mongoose");

const getContentByCodeName = async (req, res) => {
  try {
    const content = await RealEstateContent.findOne({
      code_name: req.params.code_name,
    })
      .populate("main_heading")
      .populate("sub_heading");
    if (!content) return res.status(404).json({ message: "Content not found" });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Existing controllers...
const createContent = async (req, res) => {
  try {
    const { main_heading, sub_heading, code_name, description } = req.body;
    const images = req.files?.map((file) => file.path) || [];
    if (images.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }
    const content = await RealEstateContent.create({
      main_heading,
      sub_heading,
      code_name,
      images,
      description: description ? description.split(",") : [],
    });
    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getContents = async (req, res) => {
  try {
    const contents = await RealEstateContent.find()
      .populate("main_heading")
      .populate("sub_heading");
    res.json(contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getContentById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const content = await RealEstateContent.findById(req.params.id)
      .populate("main_heading")
      .populate("sub_heading");
    if (!content) return res.status(404).json({ message: "Not found" });
    res.json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const { description, existing_images, ...otherFields } = req.body;
    let updateData = { ...otherFields };

    if (description) {
      updateData.description = description.split(",").filter(Boolean);
    }

    let existingImagesFromBody = [];
    if (existing_images) {
      try {
        existingImagesFromBody = JSON.parse(existing_images);
        if (!Array.isArray(existingImagesFromBody)) existingImagesFromBody = [];
      } catch (parseErr) {
        if (Array.isArray(existing_images))
          existingImagesFromBody = existing_images;
        else
          existingImagesFromBody = String(existing_images)
            .split(",")
            .filter(Boolean);
      }
    }

    const uploadedImages =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.path)
        : [];

    updateData.images = [...existingImagesFromBody, ...uploadedImages];

    const content = await RealEstateContent.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(content);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    await RealEstateContent.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentByCodeName, // Export new function
};
