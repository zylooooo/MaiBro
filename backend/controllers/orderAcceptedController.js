const { db } = require("../config");

async function acceptOrder(req, res) {
    const { orderId } = req.body;

    try {
        // Update the orderAccepted field in the database
        await db.collection("AvailableOrders").doc(orderId).update({
            orderAccepted: true
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


module.exports = { acceptOrder };