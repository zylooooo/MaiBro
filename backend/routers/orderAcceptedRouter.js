const express = require("express");
const { acceptOrder } = require("../controllers/orderAcceptedController");

const orderAcceptedRouter = express.Router();

orderAcceptedRouter.get("/health", async (req, res) => {
    console.log("Order Accepted router hit!");
    return res.status(200).json({
        message: "Order Accepted router hit!"
    });
});
orderAcceptedRouter.put("/", acceptOrder); // put because we are updating the order

module.exports = orderAcceptedRouter;