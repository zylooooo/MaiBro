const fs = require("fs"); // Import the fs module to read files
const path = require("path"); // Import the path module to handle file paths
require("dotenv").config(); // Import the dotenv module to read the environment variables from the .env file
const admin = require("firebase-admin"); // Import the firebase-admin module, allow secure connection with firebase
const axios = require("axios");
const { Server } = require("socket.io");
const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { chatRoomModel, Message } = require("./models/chatRoom");

const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(serviceAccountKeyPath), "utf8")); // Read the service account key file
// Initialise app with admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseURL
});

// Connect to the firebase database
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
            origin: ["https://localhost:5173"],
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
        socket.on('chat message', async ({ roomId, message, sender }) => {
            // Save the message to the database
            try {
                // Get or create the chat room model for the specific roomId
                const ChatRoom = chatRoomModel(roomId);
                const chatRoom = await ChatRoom.findOne({ _id: roomId });

                if (chatRoom) {
                    const newMessage = new Message({
                        _id: sender,
                        message: message,
                    });

                    chatRoom.messages.push(newMessage);
                    await chatRoom.save();
                }
            } catch (error) {
                console.error("Failed to save message to the databse!", error);
            }

            // Broadcast the message to the room
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

// Set up the mongoDB client using Mongoose
mongoose.connect(process.env.MONGODB_URI, {
    serverApi: ServerApiVersion.v1,
});

const mongodb = mongoose.connection;

mongodb.on("error", () => {
    console.error("Error connecting to MongoDB using Mongoose!");
});
mongodb.once("open", () => {
    console.log("Connected to MongoDB successfully using Mongoose!");
});

// Export the modules to be used in other files
module.exports = { admin, db, auth, axiosInstance, initSocket, getIO, mongodb };