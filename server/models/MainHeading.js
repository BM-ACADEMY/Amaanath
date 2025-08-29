const mongoose = require("mongoose");

const mainHeadingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Buy", "Sell"], // restrict to Buy/Sell
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MainHeading", mainHeadingSchema);
