const { chatRoomModel, Message } = require("../models/chatRoom");

// Function to create a new chat room every time a new socket connection is made
async function createChat(req, res) {
    const { roomId } = req.body;

    try {
        // Logic to check if the chat room already exists
        const ChatRoom = chatRoomModel(roomId);
        const existingChatRoom = await ChatRoom.findOne({ _id: roomId });

        if (existingChatRoom) {
            console.log("ROOM CREATED!");
            return res.status(409).json({
                message: "Chat room already exists!",
            });
        }

        const chat = new ChatRoom({
            _id: roomId,
        });
        
        await chat.save();
        return res.status(201).json({
            message: "Chat room created successfully!",
        });
    } catch (error) {
        console.error("Failed to create chat room:", error);
        return res.status(500).json({
            error: "Failed to create chat room!",
        });
    }
}

// Function to get all of the chat messages that is sent in the chat room
async function getAllMessages(req, res) {
    const roomId = req.query.roomId; // Assuming roomId is passed as a query parameter

    try {
        const ChatRoom = chatRoomModel(roomId); // Get the model for the specific roomId
        const chatRoom = await ChatRoom.findOne({ _id: roomId }); // Query for the chat room

        if (!chatRoom) {
            return res.status(404).json({
                error: "Chat room not found!",
            });
        }
    
        const messages = chatRoom.messages;
        return res.status(200).json({
            message: "All messages retrieved successfully!",
            messages,
        });

    } catch (error) {
        console.error("Failed to get all messages:", error);
        return res.status(500).json({
            error: "Failed to get all messages!",
        });
    }
}

// Function to update the chat room with new messages
async function updateChatRoomMessages(req, res) {
    const { roomId, message, sender } = req.body;

    try {
        const ChatRoom = chatRoomModel(roomId); // Get the model for the specific roomId
        const chatRoom = await ChatRoom.findOne({ _id: roomId }); // Query for the chat room

        if (!chatRoom) {
            return res.status(404).json({
                error: "Chat room not found!",
            });
        }

        const newMessage = new Message({
            _id: sender,
            message: message,
        });

        chatRoom.messages.push(newMessage);
        await chatRoom.save();

        return res.status(200).json({
            message: "Message saved successfully!",
        });

    } catch (error) {
        console.error("Failed to save message:", error);
        return res.status(500).json({
            error: "Failed to save message!",
        });
    }
}

module.exports = { createChat, getAllMessages, updateChatRoomMessages };
