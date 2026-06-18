const express = require("express");
const router = express.Router();

const {createPortfolio,getPortfolio,updatePortfolio,deletePortfolio} = require("../controllers/portfolioController");

router.post("/create", createPortfolio);

router.get("/:email", getPortfolio);

router.put("/update/:email", updatePortfolio);

router.delete("/delete/:email", deletePortfolio);

module.exports = router;