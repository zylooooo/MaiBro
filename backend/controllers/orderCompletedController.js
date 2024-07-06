const { db } = require("../config");

async function orderCompleted(req, res) {
    const { orderId } = req.body;

    try {
        // Update the orderCompleted field in the database
        await db.collection("AllOrders").doc(orderId).update({
            orderCompleted: true
        });

        return res.status(200).json({
            message: "Order accepted successfully!"
        });
    } catch (error) {
        console.error("Error accepting order:", error);
        return res.status(400).json({
            error: "Error accepting order!"
        });
    }
}

module.exports = { orderCompleted };