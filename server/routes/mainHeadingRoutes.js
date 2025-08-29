const express = require("express");
const {
  createMainHeading,
  getMainHeadings,
  getMainHeadingById,
  updateMainHeading,
  deleteMainHeading,
} = require("../controllers/mainHeadingController");

const router = express.Router();

router.post("/", createMainHeading);
router.get("/", getMainHeadings);
router.get("/:id", getMainHeadingById);
router.put("/:id", updateMainHeading);
router.delete("/:id", deleteMainHeading);

module.exports = router;
