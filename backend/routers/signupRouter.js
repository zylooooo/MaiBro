const express = require("express");
const { createNewUser } = require("../controllers/signupController");

const signupRouter = express.Router();

// Check if the route is working
signupRouter.get("/", (req, res) => {
    console.log("Signup route hit");
    return res.status(200).json({ message: "Signup route hit" });
});
signupRouter.post("/signup", createNewUser);

module.exports = signupRouter;
