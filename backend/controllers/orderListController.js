const { db } = require("../config");

async function getOrderList(req, res) {
    // Look through the database and find the orders that are not accepted
    try {
        const availableOrdersRef = db.collection("AvailableOrders");
        const availableOrdersCollection = await availableOrdersRef.get();
        const availableOrdersPromises = availableOrdersCollection.docs.map(async doc => {
            const availableOrderData = doc.data();
            if (availableOrderData && availableOrderData.orderAccepted === false && availableOrderData.orderCompleted === false) {
                return availableOrderData;
            } else {
                return null;
            }
        });

        const availableOrders = (await Promise.all(availableOrdersPromises)).filter(order => order !== null);
        return res.status(200).json(availableOrders);
    } catch (error) {
        console.error("Error getting available orders:", error);
        return res.status(500).json({
            error: "Error getting available orders from firestore!"
        });
    }
}

module.exports = { getOrderList };