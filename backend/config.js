const { initializeApp, cert } = require("firebase-admin/app"); // Import the initializeApp and cert functions from the firebase-admin/app module, allow secure connection with firebase
const { getFirestore } = require("firebase-admin/firestore"); // Import the getFirestore function from the firebase-admin/firestore module, to connect to the firestore database
const serviceAccount = require("./serviceAccountKey.json"); // Import the firebase service Account key

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

// Expor the db to be used in other files
module.exports = { db };