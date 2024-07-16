const express = require("express");
const { sendNotification } = require("../controllers/notificationController");

const notificationRouter = express.Router();

notificationRouter.get("/health", async (req, res) => {
    return res.status(200).json({
        message: "Notification route hit!",
    });
});
notificationRouter.post("/", sendNotification);

module.exports = notificationRouter;