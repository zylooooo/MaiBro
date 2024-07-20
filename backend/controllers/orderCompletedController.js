const { db } = require("../config");

/**
 * Marks an order as completed by moving it from the AvailableOrders collection to the AllOrders collection.
 * @param {Object} req - The request object containing the order ID.
 * @param {Object} res - The response object used to send back the HTTP response.
 */
async function orderCompleted(req, res) {
    const { orderId } = req.body;
    try {
        const orderSnapshot = await db.collection("AvailableOrders").doc(orderId).get();
        if (!orderSnapshot.exists) {
            return res.status(404).json({
                error: "Order not found!",
            });
        }
        const orderData = orderSnapshot.data();

        const order = await db.collection("AvailableOrders").doc(orderId).update({
            orderCompleted: true
        });
        
        //Create a new order in the AllOrders collection to copy over data
        await db.collection("AllOrders").doc(orderId).set(orderData);

        // Finally, remove the order from the AvailableOrders collection
        await db.collection("AvailableOrders").doc(orderId).delete();

        return res.status(200).json({
            message: "Order accepted successfully!"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error accepting order!"
        });
    }
}

module.exports = { orderCompleted };