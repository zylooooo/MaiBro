const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const chatRoomSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: Date.now },
    messages: [messageSchema],
}, { _id: false }); // Disable auto generation of _id

// Function to get or create a model for a specific roomId
function chatRoomModel(roomId) {
    // Check if the model for the roomId already exists
    if (mongoose.models[roomId]) {
        // Return the existing model
        return mongoose.models[roomId];
    } else {
        // Create a new model for the roomId
        return mongoose.model(roomId, chatRoomSchema, roomId);
    }
}

module.exports = { chatRoomModel, messageSchema, chatRoomSchema };