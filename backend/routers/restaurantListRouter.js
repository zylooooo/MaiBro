const express = require("express");
const { restaurantList } = require("../controllers/restaurantListController");

const restaurantListRouter = express.Router();

restaurantListRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Restaurant list route hit!"
    });
});
restaurantListRouter.get("/", restaurantList);

module.exports = restaurantListRouter;