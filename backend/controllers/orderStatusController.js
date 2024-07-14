const { db } = require("../config");

async function getBuyerStatusBar(req,res) {
    const {userName} = req.query;
    try {
        const availableOrdersRef = db.collection("AvailableOrders");
        const availableOrdersQuery = availableOrdersRef.where("buyerId", "==", userName);
        const availableOrdersSnapshot = await availableOrdersQuery.get();
        const availableOrders = availableOrdersSnapshot.docs.map(doc => {
            return {
                docId: doc.id,
                ...doc.data()
            };
        });
        return res.status(200).json(availableOrders[0]);
    } catch {
        return res.status(500).json({
            error: "Error getting available orders from firestore!"
        });
    }
}

async function getBuyerOrder(req, res) {
    // Look through the database and find the orders that are not accepted
    const { docId } = req.query;
    try {
        const availableOrderRef = db.collection("AvailableOrders").doc(docId);
        const availableOrderDoc = await availableOrderRef.get();
        if (availableOrderDoc.exists) {
            const availableOrderData = availableOrderDoc.data();
            return res.status(200).json( {
            docId: docId,
            ...availableOrderData
            })
        } else {
            return null;
        };
    } catch (error) {
        console.error("Error getting available orders:", error);
        return res.status(500).json({
            error: "Error getting available orders from firestore!"
        });
    }
}

async function getBroOrder(req, res) {
    // Look through the database and find the orders that are not accepted
    const {userName} = req.query;
    try {
        const availableOrdersRef = db.collection("AvailableOrders");
        const availableOrdersCollection = await availableOrdersRef.get();
        const availableOrdersPromises = availableOrdersCollection.docs.map(async doc => {
            const availableOrderData = doc.data();
            if (availableOrderData && availableOrderData.broId === userName) {
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

module.exports = { getBuyerOrder, getBroOrder, getBuyerStatusBar };