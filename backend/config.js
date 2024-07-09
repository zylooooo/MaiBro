const admin = require("firebase-admin"); // Import the firebase-admin module, allow secure connection with firebase
const serviceAccount = require("./serviceAccountKey.json"); // Import the firebase service Account key

// Initialise app with admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseURL
});

/* Connect to the firebase database
    The getFirestore() function returns a Firestore instance that is associated with the specified Firebase app.
    The databaseURL is the URL to the Firebase Realtime Database.
    Also included how to verify the connection to firebase database.
*/
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

// Function to check the connectionn to the Firebase database
async function checkFirebaseConnection() {
    try {
        await db.doc("test/doc").get();
        console.log("Connected to the database successfully!");
    } catch (error) {
        console.error("Faied to connect to the data base", error);
    }
}

checkFirebaseConnection();

// Create a Firebase auth instance
const auth = admin.auth();

// Export the db to be used in other files
module.exports = { db, auth };



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

// template to create a collection and document in firebase
// const userRef = db.collection("AvailableOrders").doc("testOrder");
// userRef.set({
//     orderID: 123,
//     orderCompleted: false,
//     orderAccepted: true,
//     restaurant: "McDonalds",
//     buyerID: "buyer123",
//     broID: "MaiBro",
//     earnings: 2.00
// });