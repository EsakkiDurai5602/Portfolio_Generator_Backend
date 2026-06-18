const Portfolio = require("../models/Portfolio");

//create portfolio
async function createPortfolio(req, res) {
    try {
        const portfolio = new Portfolio(req.body);
        await portfolio.save();

        res.status(201).json({message: "Portfolio Created",portfolio});

    } catch (err) {
        res.status(500).json({message: "Error creating portfolio"});
    }
}

// get portfolio
async function getPortfolio(req, res) {
    try {
        const email = req.params.email;

        const portfolio = await Portfolio.findOne({ email });

        if (!portfolio) {
            return res.status(404).json({message: "Portfolio not found"});
        }

        res.json(portfolio);

    } catch (err) {
        res.status(500).json({message: "Error fetching portfolio"});
    }
}

// update portfolio
async function updatePortfolio(req, res) {
    try {
        const email = req.params.email;

        const updated = await Portfolio.findOneAndUpdate({ email },req.body,{ new: true });

        res.json({message: "Portfolio Updated",updated});

    } catch (err) {
        res.status(500).json({
            message: "Error updating portfolio"
        });
    }
}

// delete portfolio
async function deletePortfolio(req, res) {
    try {
        const email = req.params.email;

        await Portfolio.findOneAndDelete({ email });

        res.json({message: "Portfolio Deleted"});

    } catch (err) {
        res.status(500).json({
            message: "Error deleting portfolio"
        });
    }
}

module.exports = {createPortfolio,getPortfolio,updatePortfolio,deletePortfolio};