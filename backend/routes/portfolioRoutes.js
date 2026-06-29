const express = require("express");
const router = express.Router();

const {
  createPortfolio,
  getPortfolio,
  getMyPortfolio,
  updatePortfolio,
  deletePortfolio,
  togglePublishPortfolio,
  getAllPublishedPortfolios,
  deletePortfolioAdmin,
} = require("../controllers/portfolioController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

router.get("/public", getAllPublishedPortfolios);
router.get("/:identifier", getPortfolio);

router.post("/", authMiddleware, createPortfolio);
router.get("/my/portfolio", authMiddleware, getMyPortfolio);
router.put("/", authMiddleware, updatePortfolio);
router.delete("/", authMiddleware, deletePortfolio);
router.patch("/publish", authMiddleware, togglePublishPortfolio);

router.delete(
  "/:portfolioId/admin",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  deletePortfolioAdmin
);

module.exports = router;
