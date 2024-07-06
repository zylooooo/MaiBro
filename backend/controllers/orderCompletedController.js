const { db } = require("../config");

// async function completeOrder(req, res) {
//     const { orderId } = req.body;

//     try {
//         // Update the orderCompleted field in the database
//         await db.collection("AvailableOrders").doc(orderId).update({
//             orderCompleted: true
//         });

//         return res.status(200).json({
//             message: "Order completed successfully!"
//         });
//     } catch (error) {
//         console.error("Error completing order:", error);
//         return res.status(400).json({
//             error: "Error completing order!"
//         });
//     }
// }

async function completeOrder(req, res) {
    // Retrieve the orderId from the request body
    const { orderId } = req.body;
   // copy the current available order into the existing AllOrders collection

    try {
        // Update the orderCompleted field in the database
         const order = await db.collection("AvailableOrders").doc(orderId).get();

         // Create a new order in the AllOrders collection
         await db.collection("AllOrders").doc(orderId).set(order.data());
        
         // After cutting and pasting the order into the AllOrdersCollection, update the orderCompleted field in the AvailableOrders collection
        await db.collection("AvailableOrders").doc(orderId).update({
            orderCompleted: true
        });

        // Finally, remove the order from the AvailableOrders collection
        await db.collection("AvailableOrders").doc(orderId).delete();

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

module.exports = { completeOrder };