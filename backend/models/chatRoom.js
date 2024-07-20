const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { _id: false });
const Message = mongoose.model("Message", messageSchema);

const chatRoomSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    createdAt: { type: Date, default: () => Date.now() },
    updatedAt: { type: Date, default: Date.now },
    messages: [messageSchema],
}, { _id: false });

// Function to get or create a model for a specific roomId
function chatRoomModel(roomId) {
    if (mongoose.models[roomId]) {
        return mongoose.models[roomId];
    } else {
        return mongoose.model("ChatRoom", chatRoomSchema, roomId);
    }
}

module.exports = { chatRoomModel, Message };