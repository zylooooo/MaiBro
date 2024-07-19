const { db } = require("../config");

async function restaurantList(req, res) {
    // Get the current day and convert into a string
    const currentDateTime = new Date();
    let currentDayNum = currentDateTime.getDay();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
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
                if (operatingHoursData.openTime === "closed") {
                    console.error("Error: Restaurant is closed for the day:", doc.id);
                    return false;
                }

                let openTime = operatingHoursData.openTime;
                let closeTime = operatingHoursData.closeTime;

                if (!openTime || !closeTime) {
                    console.error("Error: Missing operating hours data for restaurant:", doc.id);
                    return false;
                }

                // Convert times to minutes since the start of the day for easier comparison
                const toMinutes = (time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                };

                const openMinutes = toMinutes(openTime);
                const closeMinutes = toMinutes(closeTime);
                const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

                // Handle the case where the restaurant closes after midnight
                if (closeMinutes < openMinutes) {
                    // If current time is after midnight but before opening time, it's closed
                    if (currentMinutes < openMinutes && currentMinutes > closeMinutes) {
                        console.error("Error: Restaurant is closed for the day:", doc.id);
                        return false;
                    }
                } else {
                    // Standard case: open and close on the same day
                    if (currentMinutes < openMinutes || currentMinutes > closeMinutes) {
                        console.error("Error: Restaurant is closed for the day:", doc.id);
                        return false;
                    }
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