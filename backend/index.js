// // Import firebase into backend
// import firebase from "firebase/app";
// import "firebase/database";

// const firebaseConfig = {
//     apiKey: "AIzaSyD4kPTTjC5c5ZtNmmKnQGKHOKO5gsk6dbI",
//     authDomain: "maibro.firebaseapp.com",
//     projectId: "maibro",
//     storageBucket: "maibro.appspot.com",
//     messagingSenderId: "627669864890",
//     appId: "1:627669864890:web:19dcdcbe7df79b7c1b8d83",
//     measurementId: "G-X7CLMEKLRQ"
// };

// firebase.initializeApp(firebaseConfig); // Initialize firebase with the firebaseConfig object

const express = require("express"); // Import express framework into the file
const cors = require("cors"); // Imports CORS middleware
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("./serviceAccountKey.json"); // Import the firebase service Account key

// Server settings
const PORT = 8000;
const app = express(); // Create an instance of express and store it in the variable app
app.use(express.json()); // So that express can understand json

/* We need CORS to enable data from external third party applications.
   It is important when we need to pull data from external APIs and allow authorised servers to access our data.
*/
app.use(cors()); // Allow cross- origin requests
// Initialise app with admin privileges
initializeApp({
    credential: cert(serviceAccount),
    databaseURL: process.env.databaseURL
});


/* Connect to the firebase database
    The getFirestore() function returns a Firestore instance that is associated with the specified Firebase app.
    The databaseURL is the URL to the Firebase Realtime Database.
    Also included how to verify the connection to firebase database.
*/
const db = getFirestore();
// Check the connection to the firebase database using async/await
(async () => {
    try {
        await db.doc("test/doc").get();
        console.log("Connected to the firebase database");
    } catch (error) {
        console.error("Failed to connect to the firebase database", error);
    }
})();

// Start the application
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

/* Default health checkpoints
   Health check is a monitoring process that constantly checks the status of the server.
   The '/' in the hyperlink will return a message to the user that the server is up and running.
*/
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is up and running!"
    });
});

