const express = require("express");
const { getBuyerOrder, getBroOrder } = require("../controllers/orderStatusController");

const orderStatusRouter = express.Router();

orderStatusRouter.get("/health", async (req, res) => {
    console.log("Order list router hit!");
    return res.status(200).json({
        message: "Buyer Order Status router hit!"
    });
});
orderStatusRouter.get("/buyer", getBuyerOrder);
orderStatusRouter.get("/bro", getBroOrder);

module.exports = orderStatusRouter;