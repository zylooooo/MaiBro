const express = require("express");
const { getHistory } = require("../controllers/historyController");

const historyRouter = express.Router();

historyRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "History route hit!"
    });
})
historyRouter.get("/", getHistory);

module.exports = historyRouter;