const express = require("express");
const { restaurantList } = require("../controllers/restaurantListController");

const restaurantListRouter = express.Router();

// Check if the route is working
restaurantListRouter.get("/health", async (req, res) => {
    console.log("Restaurant list route hit!");

    return res.status(200).json({
        message: "Restaurant list route hit!"
    });
});
restaurantListRouter.get("/", restaurantList);

module.exports = restaurantListRouter;