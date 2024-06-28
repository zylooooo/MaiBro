const { db } = require("../config");

// Function to get all of the order of the user from the database
async function getHistory(req, res) {
    // Look through the data base and get all the orders that the user has made
    const userId = req.body.userId;

    try {
        // Find the orders submitted by the user in the available orders collection
        const availableOrdersRef = db.collection("AvailableOrders");
        const availableOrdersQuery = await availableOrdersRef.where("buyerId", "==", userId).get();

        // Find the order in the all orders collection where either the user is the Bro or the buyer
        const allOrdersRef = db.collection("AllOrders");
        const allOrdersQuery = await allOrdersRef.where("buyerId", "==", userId).get();
        const allDeliveryQuery = await allOrdersRef.where("broId", "==", userId).get();

        // Extract data from the documents
        const availableOrdersData = availableOrdersQuery.docs.map(doc => doc.data());
        const allOrdersData = allOrdersQuery.docs.map(doc => doc.data());
        const allDeliveryData = allDeliveryQuery.docs.map(doc => doc.data());

        // Combine the results from the three queries
        const history = [...availableOrdersData, ...allOrdersData, ...allDeliveryData];

        // Return the list as a JSON object
        return res.status(200).json(history);
    } catch (error) {
        console.error("Error getting history:", error);
        return res.status(500).json({
            error: "Error getting history from firestore."
        });
    }
}

module.exports = { getHistory };