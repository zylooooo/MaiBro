const express = require("express");
const { getHistory } = require("../controllers/historyController");

const historyRouter = express.Router();

// Check if the route is working
historyRouter.get("/health", async (req, res) => {
    console.log("History route hit!");
    return res.status(200).json({
        message: "History route hit!"
    });
})
historyRouter.get("/", getHistory);

module.exports = historyRouter;