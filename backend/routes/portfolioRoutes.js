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
  toggleLikePortfolio,
  addComment,
  addReply,
} = require("../controllers/portfolioController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");
const upload = require("../middleware/upload");

router.get("/public", getAllPublishedPortfolios);
router.get("/:identifier", getPortfolio);

router.post("/", authMiddleware, createPortfolio);
router.get("/my/portfolio", authMiddleware, getMyPortfolio);
router.put("/", authMiddleware, updatePortfolio);
router.delete("/", authMiddleware, deletePortfolio);
router.patch("/publish", authMiddleware, togglePublishPortfolio);

router.post("/upload", authMiddleware, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const host = req.get("host");
  const protocol = req.protocol;
  const fileUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
  return res.json({
    success: true,
    message: "File uploaded successfully",
    url: fileUrl,
  });
});

router.delete(
  "/:portfolioId/admin",
  authMiddleware,
  authorizationMiddleware(["admin"]),
  deletePortfolioAdmin
);

router.post("/:portfolioId/like", authMiddleware, toggleLikePortfolio);
router.post("/:portfolioId/comment", authMiddleware, addComment);
router.post("/:portfolioId/comment/:commentId/reply", authMiddleware, addReply);

module.exports = router;
