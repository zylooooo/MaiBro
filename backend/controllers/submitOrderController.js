const { db } = require("../config");
const crypto = require("crypto");

/**
 * Create an instance of the order in the database with all of the relevant order details.
 * @param {Object} req - The request object containing all of the order details.
 * @param {*} res - The response object used to send back HTTP requests.
 * @returns - A response object containing the oerder ID and the server response. 
 */
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
    
    try {
        const orderId = generateOrderId();

        const now = new Date();

        const dateOptions = { day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = now.toLocaleDateString('en-US', dateOptions).replace(',', '');

        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

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

/**
 * Helper function to randomly generate a 16 character long orderid
 * @returns A randomly generated order ID.
 */
function generateOrderId() {
    return crypto.randomBytes(16).toString("hex");
}