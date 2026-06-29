const express = require("express");
const router = express.Router();

const {
  getTemplates,
  getTemplate,
  previewTemplate,
} = require("../controllers/templateController");

router.get("/", getTemplates);
router.get("/:templateId", getTemplate);
router.get("/:templateId/preview", previewTemplate);

module.exports = router;
