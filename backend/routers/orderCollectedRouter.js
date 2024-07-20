const express = require("express");
const { orderCollected } = require("../controllers/orderCollectedController");

const orderCollectedRouter = express.Router();

orderCollectedRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Order Collected router hit!"
    });
});
orderCollectedRouter.put("/", orderCollected);

module.exports = orderCollectedRouter;