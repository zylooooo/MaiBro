const { db } = require("../config");

/**
 * Get all of the open restaurants based on our database at the time of request.
 * @param {Object} req - The request object. 
 * @param {*} res - The response object used to send back the HTTP response.
 * @returns - Returns the response object with the status of the request and the list of restaurant that are still open at the time of request in an array of JSON objects.
 */
async function restaurantList(req, res) {
    // Get the current day and convert into a string
    const currentDateTime = new Date();
    let currentDayNum = currentDateTime.getDay();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let currentDay = days[currentDayNum];

    try {
        const restaurantsCollectionRef = db.collection("Restaurants");
        const restaurantsCollection = await restaurantsCollectionRef.get();
        const openRestaurantsPromises = restaurantsCollection.docs.map(async (doc) => {
            const operatingHoursDocRef = doc.ref.collection("operatingHours").doc(currentDay);
            const operatingHoursDoc = await operatingHoursDocRef.get();
            const operatingHoursData = operatingHoursDoc.data();

            // Helper function to check if the restaurant is open. Rewturns the a boolean value if the restaurant is open or not
            function isOpen(operatingHoursData, currentDateTime) {
                if (operatingHoursData.openTime === "closed") {
                    return false;
                }

                let openTime = operatingHoursData.openTime;
                let closeTime = operatingHoursData.closeTime;

                if (!openTime || !closeTime) {
                    return false;
                }

                const toMinutes = (time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    return hours * 60 + minutes;
                };

                const openMinutes = toMinutes(openTime);
                const closeMinutes = toMinutes(closeTime);
                const currentMinutes = currentDateTime.getHours() * 60 + currentDateTime.getMinutes();

                if (closeMinutes < openMinutes) {
                    if (currentMinutes < openMinutes && currentMinutes > closeMinutes) {
                        return false;
                    }
                } else {
                    if (currentMinutes < openMinutes || currentMinutes > closeMinutes) {
                        return false;
                    }
                }

                return true;
            }
            
            // Return a promise of the restaurant data if the restaurant is open else return null
            if (operatingHoursData && isOpen(operatingHoursData, currentDateTime)) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
            return null;
        })

        const openRestaurants = (await Promise.all(openRestaurantsPromises)).filter(restaurant => restaurant !== null);
        return res.status(200).json(openRestaurants);
    } catch (error) {
        return res.status(500).json({
            error: "Error getting list of restuarants from firestore."
        });
    }
}

module.exports = { restaurantList };