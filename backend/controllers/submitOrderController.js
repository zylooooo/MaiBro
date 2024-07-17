const { db } = require("../config");
const crypto = require("crypto");

async function submitOrder(req, res) {
    const {
        buyerId,
        earnings,
        latitude,
        longitude,
        orderAccepted,
        orderCompleted,
        orderCollected,
        restaurant,
        orderItems,
        deliveryLocation
    } = req.body;
    
    // Update the database with the order details
    try {
        const orderId = generateOrderId();

        // Get Date
        const now = new Date();

        const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions).replace(',', '');

        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

        // Create a new order in the database
        await db.collection("AvailableOrders").doc(orderId).set({ 
            broId: null,
            buyerId: buyerId,
            deliveryLocation: deliveryLocation,
            earnings: earnings,
            latitude: latitude,
            longitude: longitude,
            orderAccepted: orderAccepted,
            orderCompleted: orderCompleted,
            orderCollected: orderCollected,
            orderItems: orderItems,
            restaurant: restaurant,
            orderDate: formattedDate,
            orderTime: formattedTime,
        });

        return res.status(201).json({
            docId: orderId,
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