const express = require("express");
const router = express.Router();

const {
  getPortfolioAnalytics,
  recordDownload,
  getPortfolioStats,
} = require("../controllers/analyticsController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

router.get("/", authMiddleware, getPortfolioAnalytics);
router.post("/download/:portfolioId", recordDownload);

router.get("/stats", authMiddleware, authorizationMiddleware(["admin"]), getPortfolioStats);

module.exports = router;
