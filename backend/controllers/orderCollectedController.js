const { db } = require("../config");

/**
 * Marks an order as collected by updating the orderCollected field in the AvailableOrders collection.
 * @param {Object} req - The request object containing the order ID.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
async function orderCollected(req, res) {
    const { orderId } = req.body;

    try {
        await db.collection("AvailableOrders").doc(orderId).update({
            orderCollected: true
        });

        res.status(200).json({
            message: "All orders updated successfully!"
        });
    } catch (error) {
        console.error("Error updating all orders:", error);
         return res.status(400).json({
              error: "Error updating all orders!"
         });
    }
}

module.exports = { orderCollected };