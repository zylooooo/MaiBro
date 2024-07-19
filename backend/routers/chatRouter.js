const express = require("express");
const { createChat, getAllMessages, updateChatRoomMessages } = require("../controllers/chatController");

const chatRouter = express.Router();

chatRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Chat route hit!",
    });
});
chatRouter.get("/messages", getAllMessages);
chatRouter.post("/", createChat);
chatRouter.put("/update", updateChatRoomMessages);

module.exports = chatRouter;