const fs = require("fs"); // Import the fs module to read files
const path = require("path"); // Import the path module to handle file paths
require("dotenv").config(); // Import the dotenv module to read the environment variables from the .env file
const admin = require("firebase-admin"); // Import the firebase-admin module, allow secure connection with firebase
const axios = require("axios");
const { Server } = require("socket.io");
const { MongoClient, ServerApiVersion } = require("mongodb");

const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(serviceAccountKeyPath), "utf8")); // Read the service account key file
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
        console.error("Failed to connect to the data base", error);
    }
}

checkFirebaseConnection();

// Create a Firebase auth instance
const auth = admin.auth();

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: { "Content-Type": "application/json" },
    withCredentials: false,
});

// Initialise the socket.io server
let io;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173"],
        },
    });

    // Check the socket connection
    io.on("connection", socket => {
        console.log(`User ${socket.id} connected!`);

        // Handle disconnection
        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected!`);
        })
    });

    // Add event listeners to the socket.io
    io.on("connection", socket => {
        console.log(`User ${socket.id} connected!`);
    
        // Listen for the join room event
        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId}`);
        });
    
        // Listen for 'chat message' event and broadcast to the room
        socket.on('chat message', ({ roomId, message, sender }) => {
            io.to(roomId).emit('chat message', {message, sender});
            console.log(`Message sent to room ${roomId}: ${message} by user ${socket.id}`);
        });
    
        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });
    });

    return io;
}

// Function to get the socket.io instance in other files
function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialised!");
    }
    return io;
}

// Set up the MongoDB client
const client = new MongoClient(process.env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function initMongodb() {
    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB!", error);
    } finally {
        // Ensure that the client will close regardless if there was an error or when you finish with the db
        client.close();
    }
}

const mongodb = initMongodb();

// Export the modules to be used in other files
module.exports = { db, auth, axiosInstance, initSocket, getIO, mongodb };



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