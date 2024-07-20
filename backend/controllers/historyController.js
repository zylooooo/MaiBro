const { db } = require("../config");

/**
 * Get all orders of the user from the database.
 * @param {Object} req - The request object obtaining the userId from the query.
 * @param {Object} res - The response object.
 */
async function getHistory(req, res) {
    const userId = req.query.userId;

    try {
        const history = await fetchUserHistory(userId);
        const sortedOrders = sortOrdersByDateTime(history);
        return res.status(200).json(sortedOrders);
    } catch (error) {
        return res.status(500).json({ error: "Error getting history from firestore." });
    }
}

/**
 * Fetches the user's order history from the database.
 * @param {string} userId - The user's ID.
 * @returns {Promise<Array>} - A promise that resolves to the user's order history.
 */
async function fetchUserHistory(userId) {
    const availableOrdersRef = db.collection("AvailableOrders");
    const allOrdersRef = db.collection("AllOrders");

    const queries = [
        availableOrdersRef.where("buyerId", "==", userId).get(),
        availableOrdersRef.where("broId", "==", userId).get(),
        allOrdersRef.where("buyerId", "==", userId).get(),
        allOrdersRef.where("broId", "==", userId).get()
    ];

    const [availableOrdersQuery, availableDeliveryQuery, allOrdersQuery, allDeliveryQuery] = await Promise.all(queries);

    return [
        ...availableOrdersQuery.docs.map(doc => doc.data()),
        ...availableDeliveryQuery.docs.map(doc => doc.data()),
        ...allOrdersQuery.docs.map(doc => doc.data()),
        ...allDeliveryQuery.docs.map(doc => doc.data())
    ];
}

/**
 * Sorts orders by date and time.
 * @param {Array} orders - The orders to sort.
 * @returns {Array} - The sorted orders.
 */
function sortOrdersByDateTime(orders) {
    return orders.sort((a, b) => {
        const dateA = new Date(`${convertDate(a.orderDate)}T${convertTime12to24(a.orderTime)}:00`);
        const dateB = new Date(`${convertDate(b.orderDate)}T${convertTime12to24(b.orderTime)}:00`);
        return dateB - dateA;
    });
}

/**
 * Converts a date string from 'dd MMMM yyyy' to a Date object.
 * @param {string} dateStr - The date string to convert.
 * @returns {Date} - The converted Date object.
 */
const convertDate = dateStr => new Date(dateStr);

/**
 * Converts 12-hour time to 24-hour time.
 * @param {string} timeStr - The time string to convert.
 * @returns {string} - The converted time string.
 */
const convertTime12to24 = timeStr => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    hours = modifier.toLowerCase() === 'pm' && hours !== '12' ? String(+hours + 12) : 
            modifier.toLowerCase() === 'am' && hours === '12' ? '00' : hours;
    return `${hours.padStart(2, '0')}:${minutes}`;
};

module.exports = { getHistory };