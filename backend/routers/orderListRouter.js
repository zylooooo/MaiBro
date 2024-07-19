const express = require("express");
const { getOrderList } = require("../controllers/orderListController");

const orderListRouter = express.Router();

orderListRouter.get("/health", async (req, res) => {
    console.log("Order list router hit!");
    return res.status(200).json({
        message: "Order list router hit!"
    });
});
orderListRouter.get("/", getOrderList);

module.exports = orderListRouter;