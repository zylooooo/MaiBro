const express = require("express");
const { orderCollected } = require("../controllers/orderCollectedController");

const orderCollectedRouter = express.Router();

orderCollectedRouter.get("/health", async (req, res) => {
    console.log("Order Collected router hit!");
    return res.status(200).json({
        message: "Order Collected router hit!"
    });
});
orderCollectedRouter.put("/", orderCollected); // put because we are updating the order

module.exports = orderCollectedRouter;