const express = require("express");
const { orderAccepted } = require("../controllers/orderAcceptedController");

const orderAcceptedRouter = express.Router();

orderAcceptedRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Order Accepted router hit!"
    });
});
orderAcceptedRouter.put("/", orderAccepted);

module.exports = orderAcceptedRouter;