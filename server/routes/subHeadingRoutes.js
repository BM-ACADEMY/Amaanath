const express = require("express");
const {
  createSubHeading,
  getSubHeadings,
  getSubHeadingById,
  updateSubHeading,
  deleteSubHeading,
} = require("../controllers/subHeadingController");

const router = express.Router();

router.post("/", createSubHeading);
router.get("/", getSubHeadings);
router.get("/:id", getSubHeadingById);
router.put("/:id", updateSubHeading);
router.delete("/:id", deleteSubHeading);

module.exports = router;
