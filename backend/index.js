const express = require("express"); // Import express framework into the file
const cors = require("cors"); // Imports CORS middleware
const { db, auth } = require("./config"); // Import the db object from the config.js file (which is the connection to the firebase database


// Server settings
const PORT = 8000;
const app = express(); // Create an instance of express and store it in the variable app
app.use(express.json()); // So that express can understand json

/* We need CORS to enable data from external third party applications.
   It is important when we need to pull data from external APIs and allow authorised servers to access our data.
*/
app.use(cors()); // Allow cross- origin requests

/* Default health checkpoints
   Health check is a monitoring process that constantly checks the status of the server.
   The '/' in the hyperlink will return a message to the user that the server is up and running.
*/
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is up and running!"
    });
});

// Connect to the all the routers
app.use("/login", require("./routers/loginRouter"));
app.use("/signup", require("./routers/signupRouter"));
app.use("/restaurant-list", require("./routers/restaurantListRouter"));
app.use("/submit-order", require("./routers/submitOrderRouter"));
app.use("/history", require("./routers/historyRouter"));
app.use("/order-list", require("./routers/orderListRouter"));
app.use("/order-accepted", require("./routers/orderAcceptedRouter"));
app.use("/order-collected", require("./routers/orderCollectedRouter"));
app.use("/order-completed", require("./routers/orderCompletedRouter"));
app.use("/order-menu", require("./routers/orderMenuRouter"));
app.use("/order-status", require("./routers/orderStatusRouter"));

// Start the application
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});



// Testing: fetching a data from one collection and use it to fetch data from another document from another collection with the same document ID
// let restaurantName = "55";
// (async () => {
//     try {
//         const availableOrdersRef = db.collection("AvailableOrders").doc("testOrder");
//         const doc = await availableOrdersRef.get();
//         if (doc.exists) {
//             restaurantName = doc.data().restaurant;
//             console.log(restaurantName); // Now logs the updated name after fetching from the database

//             // Assuming you want to fetch more data based on the updated restaurantName
//             const restaurantRef = db.collection("Restaurants").doc(restaurantName);
//             const restaurantDoc = await restaurantRef.get();
//             if (restaurantDoc.exists) {
//                 console.log(restaurantDoc.data());
//             } else {
//                 console.log("No such document!");
//             }
//         } else {
//             console.log("No such document!");
//         }
//     } catch (error) {
//         console.error("Error getting document:", error);
//     }
// })();
