const express = require("express");
const { createChat } = require("../controllers/chatController");

const chatRouter = express.Router();

chatRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Chat route hit!",
    });
});
chatRouter.post("/", createChat);

module.exports = chatRouter;