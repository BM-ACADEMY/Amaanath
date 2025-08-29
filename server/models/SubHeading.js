const mongoose = require("mongoose");

const subHeadingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Commercial & Investment", "Residential"], // restrict options
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubHeading", subHeadingSchema)
