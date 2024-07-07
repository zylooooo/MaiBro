const { db } = require("../config");

async function getOrderMenu(req, res) {
    // Get the restaurantId from the request body
    const { restaurantId } = req.body;

    try {
        // Get the restaurant document from the database
        const restaurantRef = db.collection("Restaurants").doc(restaurantId);

        // Check if the restaurant exists
        const restaurantDoc = await restaurantRef.get();

        // If the restaurant does not exist, return an error
        if (!restaurantDoc.exists) {
            return res.status(404).json({
                error: "Restaurant not found!"
            });
        }

        // Get the menu items from the restaurant
        const menuRef = restaurantRef.collection("menu");

        // Get the menu items from the database
        const snapshot = await menuRef.get();

        // If there are no menu items, return an error
        if (snapshot.empty) {
            return res.status(404).json({ error: "No menu found!" });
        }

        // Create an array to store the menu items
        let menuItems = [];

        // Add each menu item to the array
        snapshot.forEach(doc => {
            menuItems.push(doc.data());
        });

        // Return the menu items
        return res.status(200).json(menuItems);
        
    } catch (error) {
        console.error("Error getting menu:", error);
        return res.status(500).json({
            error: "Error getting menu from firestore!"
        });
    }
}

module.exports = { getOrderMenu };