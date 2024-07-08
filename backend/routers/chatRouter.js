const express = require("express");
const { io } = require("../index");

const chatRouter = express.Router();

chatRouter.get("/health", (req, res) => {
    return res.status(200).json({
        message: "Chat router is up and running!"
    });
});

module.exports = chatRouter;