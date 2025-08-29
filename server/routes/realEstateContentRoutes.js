const express = require("express");
const upload = require("../middleware/multer");
const {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
  getContentByCodeName, // New controller function
} = require("../controllers/realEstateContentController");

const router = express.Router();

router.post("/", upload.array("images", 10), createContent);
router.get("/", getContents);
router.get("/:id", getContentById);
router.get("/code/:code_name", getContentByCodeName); // New route for code_name
router.put("/:id", upload.array("images", 10), updateContent);
router.delete("/:id", deleteContent);

module.exports = router;