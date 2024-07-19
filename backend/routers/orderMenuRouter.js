const express = require("express");
const { getOrderMenu } = require("../controllers/orderMenuController");

const orderMenuRouter = express.Router();

orderMenuRouter.get("/health", async (req, res) => {
    console.log("Order menu router hit!");
    return res.status(200).json({
        message: "Order menu router hit!"
    });
});
orderMenuRouter.get("/", getOrderMenu);

module.exports = orderMenuRouter;