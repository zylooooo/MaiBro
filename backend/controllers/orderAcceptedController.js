const { db } = require("../config");

/**
 * Handles the acceptance of an order by updating the order status in the database.
 * @param {Object} req - The request object containing the order ID and user name.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
async function orderAccepted(req, res) {
    const { orderId, userName } = req.body;

    try {
        await db.collection("AvailableOrders").doc(orderId).update({
            broId: userName,
            orderAccepted: true
        });

        return res.status(200).json({
            message: "All orders updated successfully!"
        });

    } catch (error) {
         return res.status(400).json({
              error: "Error updating all orders!"
         });
    }
}

module.exports = { orderAccepted };