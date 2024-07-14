const express = require("express");
const { orderCompleted } = require("../controllers/orderCompletedController");

const orderCompletedRouter = express.Router();

orderCompletedRouter.get("/health", async (req, res) => {
    console.log("Order Completed router hit!");
    return res.status(200).json({
        message: "Order Completed router hit!"
    });
});

orderCompletedRouter.post("/", orderCompleted); // post beacause we are inserting the order into the AllOrders collection

module.exports = orderCompletedRouter;