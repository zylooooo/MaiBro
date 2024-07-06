const { db } = require("../config");
const crypto = require("crypto");

async function submitOrder(req, res) {
    const {
        buyerId,
        earnings,
        orderAccepted,
        orderCompleted,
        restaurant,
        orderItems,
        deliveryLocation
    } = req.body;

    // Update the database with the order details
    try {
        const orderId = generateOrderId();

        // Create a new order in the database
        await db.collection("AvailableOrders").doc(orderId).set({ 
            broId: null,
            buyerId: buyerId,
            deliveryLocation: deliveryLocation,
            earnings: earnings,
            orderAccepted: orderAccepted,
            orderCompleted: orderCompleted,
            orderItems: orderItems,
            restaurant: restaurant
        });

        return res.status(201).json({
            message: "Order submitted successfully!"
        });
    } catch (error) {
        console.error("Error submitting order:", error);
        return res.status(400).json({
            error: "Error submitting order!"
        });
    }
}

module.exports = { submitOrder };

// Helper function to generate a random order ID. Returns a 32 character long string
// This function will create 2^128 possible orderIds so it is not impossible but the chances of duplicates is very low
function generateOrderId() {
    return crypto.randomBytes(16).toString("hex");
}