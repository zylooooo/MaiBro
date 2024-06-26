const express = require("express");
const { restaurantList } = require("../controllers/restaurantListController");

const restaurantListRouter = express.Router();

// Check if the route is working
restaurantListRouter.get("/", async (req, res) => {
    console.log("Restaurant list route hit!");

    // Testing code to get all the restaurants

    return res.status(200).json({
        message: "Restaurant list route hit!"
    });
});
restaurantListRouter.post("/", restaurantList);

module.exports = restaurantListRouter;