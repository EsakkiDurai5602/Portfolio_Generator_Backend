const Portfolio = require("../models/Portfolio");
const { sendSuccess, sendError } = require("../utils/response");

async function getPortfolioAnalytics(req, res) {
  try {
    const portfolio = await Portfolio.findOne({
      userId: req.user.userId,
    });

    if (!portfolio) {
      return sendError(res, "Portfolio not found", 404);
    }

    return sendSuccess(res, {
      viewCount: portfolio.viewCount,
      downloadCount: portfolio.downloadCount,
      isPublished: portfolio.isPublished,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
    });
  } catch (err) {
    console.error("Get analytics error:", err);
    return sendError(res, err.message || "Failed to fetch analytics", 500);
  }
}

async function recordDownload(req, res) {
  try {
    const { portfolioId } = req.params;

    const portfolio = await Portfolio.findByIdAndUpdate(
      portfolioId,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!portfolio) {
      return sendError(res, "Portfolio not found", 404);
    }

    return sendSuccess(res, { downloadCount: portfolio.downloadCount });
  } catch (err) {
    console.error("Record download error:", err);
    return sendError(res, err.message || "Failed to record download", 500);
  }
}

async function getPortfolioStats(req, res) {
  try {
    const totalPortfolios = await Portfolio.countDocuments();
    const publishedPortfolios = await Portfolio.countDocuments({
      isPublished: true,
    });
    const totalViews = await Portfolio.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$viewCount" } } },
    ]);
    const totalDownloads = await Portfolio.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: "$downloadCount" } } },
    ]);

    return sendSuccess(res, {
      totalPortfolios,
      publishedPortfolios,
      draftPortfolios: totalPortfolios - publishedPortfolios,
      totalViews: totalViews[0]?.totalViews || 0,
      totalDownloads: totalDownloads[0]?.totalDownloads || 0,
    });
  } catch (err) {
    console.error("Get stats error:", err);
    return sendError(res, err.message || "Failed to fetch statistics", 500);
  }
}

module.exports = { getPortfolioAnalytics, recordDownload, getPortfolioStats };
