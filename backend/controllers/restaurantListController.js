const { db } = require("../config");

async function restaurantList(req, res) {
    // Get the current day and convert into a string
    const currentDateTime = new Date();
    let currentDayNum = currentDateTime.getDay();
    const days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
    let currentDay = days[currentDayNum];

    try {
        // Get a reference to all of the restaurants in the "Restaurants" collection
        const restaurantsCollectionRef = db.collection("Restaurants");
        // Get all of the restaurants in the collection
        const restaurantsCollection = await restaurantsCollectionRef.get();
        // Initialize an array to store all of the open restaurants
        const openRestaurantsPromises = restaurantsCollection.docs.map(async (doc) => {
            // Access the nested collection "operatingHours" in each of the documents in the "Restaurants" collection and get the document for the current day
            const operatingHoursDocRef = doc.ref.collection("operatingHours").doc(currentDay);
            // Get the open and close time of the restaurant on the current day
            const operatingHoursDoc = await operatingHoursDocRef.get();
            const operatingHoursData = operatingHoursDoc.data();

            // Helper function to check if the restaurant is open
            function isOpen(operatingHoursData, currentDateTime) {
                // Check if the restaurant is cosed for the day
                if (operatingHoursData.openTime === "closed") {
                    return false;
                }

                let openTime = operatingHoursData.openTime;
                let closeTime = operatingHoursData.closeTime;
                const openHours = parseInt(openTime.substring(0, 2));
                const openMinutes = parseInt(openTime.substring(3));
                const closeHours = parseInt(closeTime.substring(0, 2));
                const closeMinutes = parseInt(closeTime.substring(3));
                const currentHours = parseInt(currentDateTime.getHours());
                const currentMinutes = parseInt(currentDateTime.getMinutes());

                // Comparison logic to check if the restaurant is open
                if (currentHours < openHours || currentHours > closeHours) {
                    return false;
                } else if (currentHours === openHours && currentMinutes < openMinutes) {
                    return false;
                } else if (currentHours === closeHours && currentMinutes > closeMinutes) {
                    return false;
                }
                return true;
            }
            
            // Add the restaurant to the list of open restaurants if it is open
            if (operatingHoursData && isOpen(operatingHoursData, currentDateTime)) {
                return {
                    // Add the restaurant ID to the restaurant object
                    id: doc.id,
                    ...doc.data()
                };
            }
            // Otherwise add a null object to the list of open restaurants
            return null;
        });
        // Filter out the null object from the list of open restaurants and return the list of open restaurants
        const openRestaurants = (await Promise.all(openRestaurantsPromises)).filter(restaurant => restaurant !== null);
        // Return the list as a JSON object
        return res.status(200).json(openRestaurants);
    } catch (error) {
        console.error("Error getting list of restaurants:", error);
        return res.status(500).json({
            error: "Error getting list of restuarants from firestore."
        });
    }
}

module.exports = { restaurantList };