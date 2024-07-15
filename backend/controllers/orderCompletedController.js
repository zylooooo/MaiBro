const { db } = require("../config");

async function orderCompleted(req, res) {
    const { orderId } = req.body;
    try {
        // Update the orderCompleted field in the database
        const order = await db.collection("AvailableOrders").doc(orderId).update({
            orderCompleted: true
        });

        //Get snapshot of the order + data
        const orderSnapshot = await db.collection("AvailableOrders").doc(orderId).get();
        const orderData = orderSnapshot.data();

                // Retrieve the updated document
                const orderSnapshot = await db.collection("AvailableOrders").doc(orderId).get();
        
        // Check if the document exists before trying to use .data()
        if (!orderSnapshot.exists) {
            console.error("Order not found:", orderId);
            return res.status(404).json({
                error: "Order not found!"
            });
        }

        // Create a new order in the AllOrders collection to copy over data
        await db.collection("AllOrders").doc(orderId).set(orderSnapshotData);

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

