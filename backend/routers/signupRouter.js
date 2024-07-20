const express = require("express");
const { createNewUser } = require("../controllers/signupController");

const signupRouter = express.Router();

signupRouter.get("/health", async (req, res) => {
    return res.status(200).json({ message: "Signup route hit" });
});
signupRouter.post("/", createNewUser);

module.exports = signupRouter;
