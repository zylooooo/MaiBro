const express = require ('express');
const { submitOrder } = require ('../controllers/submitOrderController');

const submitOrderRouter = express.Router();

// Check if the route is working
submitOrderRouter.get("/health", async (req, res) => {
    console.log("Submit order route hit!");

    return res.status(200).json({
        message: "Submit order route hit!"
    });
});
submitOrderRouter.post("/", submitOrder);

module.exports = submitOrderRouter;