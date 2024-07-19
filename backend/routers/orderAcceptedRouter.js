const express = require("express");
const { orderAccepted } = require("../controllers/orderAcceptedController");

const orderAcceptedRouter = express.Router();

orderAcceptedRouter.get("/health", async (req, res) => {
    console.log("Order Accepted router hit!");
    return res.status(200).json({
        message: "Order Accepted router hit!"
    });
});
orderAcceptedRouter.put("/", orderAccepted); // put because we are updating the order

module.exports = orderAcceptedRouter;