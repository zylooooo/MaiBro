const chatRoomModel = require("../models/chatRoom");

// Function to create a new chat room every time a new socket connection is made
async function createChat(req, res) {
    const { roomId, sender, message } = req.body;
    const chatRoom = chatRoomModel(roomId);

    try {
        // Adjusted to set _id to roomId
        const chat = new chatRoom({
            _id: roomId,
            sender,
            message,
        });

        await chat.save();
        return res.status(200).json({
            message: "Chat room created successfully!",
        });
    } catch (error) {
        console.error("Failed to create chat room:", error);
        return res.status(500).json({
            error: "Failed to create chat room!",
        });
    }
}

module.exports = { createChat };
