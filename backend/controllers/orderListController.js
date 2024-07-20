const { db } = require("../config");

/**
 * Gets a list of available orders for the deliverer's to choose from.
 * @param {Object} req - The request Object. 
 * @param {Object} res - The response object used to send back the HTTP response.
 * @returns 
 */
async function getOrderList(req, res) {
    try {
        const availableOrdersRef = db.collection("AvailableOrders");
        const availableOrdersCollection = await availableOrdersRef.get();
        const availableOrdersPromises = availableOrdersCollection.docs.map(async doc => {
            const availableOrderData = doc.data();
            if (availableOrderData && availableOrderData.orderAccepted === false && availableOrderData.orderCompleted === false) {
                return {
                    docId: doc.id,
                    ...availableOrderData
                };
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