const express = require("express"); // Import express framework into the file
const cors = require("cors"); // Imports CORS middleware
const { initializeApp, cert } = require("firebase-admin/app"); // Import the initializeApp and cert functions from the firebase-admin/app module, allow secure connection with firebase
const { getFirestore } = require("firebase-admin/firestore"); // Import the getFirestore function from the firebase-admin/firestore module, to connect to the firestore database
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



/* Firebase terminology:
   1) Collection: A collection is a group of documents. SQL equivalent of a table. The key is the collecton ID and the value is the documents.
   2) Document: A document is a set of key-value pairs. SQL equivalent of a row.
      - Documents cannot contain another document, but they can contain sub collections.
*/

// Testing the database
// Creating a new collection and a new document
// const docRef = db.collection("test").doc("students");
// docRef.set({
//     first: "ada",
//     last: "LoveLace",
//     age: 30
// });

// // Add instances of data to firebase
// const collectionRef = db.collection("test");
// collectionRef.add({
//     first: "alan",
//     last: "turing",
//     age: 22
// });

// // Add another document to the test collection
// const aClassRef = db.collection("test").doc("classes");
// aClassRef.set({
//     code: "CS101",
//     name: "Introduction to Computer Science",
//     section: "G1"
// });

// db.collection('test').get().then((snapshot) => {
//     snapshot.forEach((doc) => {
//         console.log(doc.id, '=>', doc.data());
//     });
// }).catch((error) => {
//     console.error("Error getting documents: ", error);
// });