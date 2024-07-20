const express = require ('express');
const { submitOrder } = require ('../controllers/submitOrderController');

const submitOrderRouter = express.Router();

submitOrderRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Submit order route hit!"
    });
});
submitOrderRouter.post("/", submitOrder);

module.exports = submitOrderRouter;