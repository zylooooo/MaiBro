const { db } = require("../config");

// Function to get all of the order of the user from the database
async function getHistory(req, res) {
    // Look through the data base and get all the orders that the user has made
    const userId = req.query.userId;

    try {
        // Find the orders submitted by the user in the available orders collection
        const availableOrdersRef = db.collection("AvailableOrders");
        const availableOrdersQuery = await availableOrdersRef.where("buyerId", "==", userId).get();
        const availableDeliveryQuery = await availableOrdersRef.where("broId", "==", userId).get();

        // Find the order in the all orders collection where either the user is the Bro or the buyer
        const allOrdersRef = db.collection("AllOrders");
        const allOrdersQuery = await allOrdersRef.where("buyerId", "==", userId).get();
        const allDeliveryQuery = await allOrdersRef.where("broId", "==", userId).get();

        // Extract data from the documents
        const availableOrdersData = availableOrdersQuery.docs.map(doc => doc.data());
        const availableDeliveryData = availableDeliveryQuery.docs.map(doc => doc.data());
        const allOrdersData = allOrdersQuery.docs.map(doc => doc.data());
        const allDeliveryData = allDeliveryQuery.docs.map(doc => doc.data());

        // Combine the results from the three queries
        const history = [...availableOrdersData, ...allOrdersData, ...allDeliveryData, ...availableDeliveryData];

        // Function to convert date from 'dd MMMM yyyy' to a Date object
        const convertDate = dateStr => new Date(dateStr);

        // Function to convert 12-hour time to 24-hour time
        const convertTime12to24 = timeStr => {
            const [time, modifier] = timeStr.split(' ');
            let [hours, minutes] = time.split(':');
            hours = modifier.toLowerCase() === 'pm' && hours !== '12' ? String(+hours + 12) : 
                    modifier.toLowerCase() === 'am' && hours === '12' ? '00' : hours;
            return `${hours.padStart(2, '0')}:${minutes}`;
        };

        const sortedOrders = history.sort((a, b) => {
            const dateA = new Date(`${convertDate(a.orderDate).toISOString().split('T')[0]}T${convertTime12to24(a.orderTime)}:00`);
            const dateB = new Date(`${convertDate(b.orderDate).toISOString().split('T')[0]}T${convertTime12to24(b.orderTime)}:00`);
            return dateB - dateA;
        });

        
        // Return the list as a JSON object
        return res.status(200).json(sortedOrders);
    } catch (error) {
        console.error("Error getting history:", error);
        return res.status(500).json({
            error: "Error getting history from firestore."
        });
    }
}

module.exports = { getHistory };