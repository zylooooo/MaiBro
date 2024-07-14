const { db } = require("../config");

async function orderCompleted(req, res) {
    const { orderId } = req.body;

    try {
        // Update the orderCompleted field in the database
        const order = await db.collection("AvailableOrders").doc(orderId).update({
            orderCompleted: true
        });
        
        //Create a new order in the AllOrders collection to copy over data
        await db.collection("AllOrders").doc(orderId).set(order.data());

        // Finally, remove the order from the AvailableOrders collection
        await db.collection("AvailableOrders").doc(orderId).delete();

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