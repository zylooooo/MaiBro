const fs = require("fs");
const path = require("path");
require("dotenv").config();
const admin = require("firebase-admin");
const axios = require("axios");
const { Server } = require("socket.io");
const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const { chatRoomModel, Message } = require("./models/chatRoom");

// Initialise firebase and firestore  with admin privileges
const serviceAccountKeyPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;
const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(serviceAccountKeyPath), "utf8")); // Read the service account key file
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.databaseURL
});
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

// Function to check the connectionn to the Firebase database
async function checkFirebaseConnection() {
    try {
        await db.doc("test/doc").get();
        return {
            message: "Connection to Firestore is Successful!",
        };
    } catch (error) {
        return {
            error: "Failed to connect to Firestore!",
        };
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

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconnected!`);
        })
    });

    // Add event listeners to the socket.io
    io.on("connection", socket => {
        console.log(`User ${socket.id} connected!`);
    
        socket.on('join room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId}`);
        });
    
        socket.on('chat message', async ({ roomId, message, sender }) => {
            // Save the message to the database
            try {
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
                console.error("Failed to save message to the database!", error);
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
    return {
        error: "Failed to connect to MongoDB!",
    };
});
mongodb.once("open", () => {
    return {
        message: "Connected to MongoDB successfully!",
    };
});

// Export the modules to be used in other files
module.exports = { admin, db, auth, axiosInstance, initSocket, getIO, mongodb };