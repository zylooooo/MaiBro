const express = require("express");

const orderAcceptedRouter = express.Router();

// Health checkpoint for the router
orderAcceptedRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Order Accepted Route hit!"
    });
});

module.exports = orderAcceptedRouter;