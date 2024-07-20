const express = require("express");
const { orderCompleted } = require("../controllers/orderCompletedController");

const orderCompletedRouter = express.Router();

orderCompletedRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Order Completed router hit!"
    });
});

orderCompletedRouter.post("/", orderCompleted);

module.exports = orderCompletedRouter;