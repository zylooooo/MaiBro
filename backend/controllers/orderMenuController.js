const { db } = require("../config");

/**
 * Get all of the menu items for a restaurant from the database.
 * @param {Object} req  - The request object that contains the restaurantId as a query.
 * @param {Object} res  - The response object that is used to send back the HTTP response.
 * @returns - Returns the response object with the status of the request and the menu items as an array of JSON objects.
 */
async function getOrderMenu(req, res) {
    // Get the restaurantId from the request body
    const { restaurantId } = req.query;

    try {
        const restaurantRef = db.collection("Restaurants").doc(restaurantId);
        const restaurantDoc = await restaurantRef.get();
        if (!restaurantDoc.exists) {
            return res.status(404).json({
                error: "Restaurant not found!"
            });
        }

        const menuRef = restaurantRef.collection("menu");
        const menuItems = await menuRef.get();
        if (menuItems.empty) {
            return res.status(200).json({ 
                error: "No menu found!" 
            });
        }

        let menuItemsArray = [];
        menuItems.forEach(doc => {
            const data = doc.data();
            menuItemsArray.push({
                itemName: doc.id.trim(),
                coverImg: data.coverImg,
                price: data.price,
                description: data.description || ""
            });
        });

        return res.status(200).json(menuItemsArray);
        
    } catch (error) {
        return res.status(500).json({
            error: "Error getting menu from firestore!"
        });
    }
}

module.exports = { getOrderMenu };