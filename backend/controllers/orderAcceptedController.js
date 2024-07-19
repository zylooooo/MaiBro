const { db } = require("../config");

async function orderAccepted(req, res) {
    // Retrieve the orderId from the request body
    const { orderId, userName } = req.body;
   // copy the current available order into the existing AllOrders collection

    try {
         // After cutting and pasting the order into the AllOrdersCollection, update the orderCompleted field in the AvailableOrders collection
        await db.collection("AvailableOrders").doc(orderId).update({
            broId: userName,
            orderAccepted: true
        });

        return res.status(200).json({
            message: "All orders updated successfully!"
        });

    } catch (error) {
         console.error("Error updating all orders:", error);
         return res.status(400).json({
              error: "Error updating all orders!"
         });
    }
}


module.exports = { orderAccepted };