const mongoose = require("mongoose");

const realEstateContentSchema = new mongoose.Schema(
  {
    main_heading: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainHeading",
      required: true,
    },
    sub_heading: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubHeading",
      required: true,
    },
    code_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    images: {
      type: [String], // store multiple image URLs
      required: true,
    },
    description: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RealEstateContent", realEstateContentSchema);
