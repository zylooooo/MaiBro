const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { _id: false }); // Disable auto generation of _id
const Message = mongoose.model("Message", messageSchema);

const chatRoomSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: Date.now },
    messages: [messageSchema],
}, { _id: false });

// Function to get or create a model for a specific roomId
function chatRoomModel(roomId) {
    // Check if the model for the roomId already exists
    if (mongoose.models[roomId]) {
        // Return the existing model
        return mongoose.models[roomId];
    } else {
        // Create a new model for the chat room and the model name will be ChatRoom
        return mongoose.model("ChatRoom", chatRoomSchema, roomId);
    }
}

module.exports = { chatRoomModel, Message };