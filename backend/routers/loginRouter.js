const express = require("express");
const { authLogin } = require("../controllers/loginController");

const loginRouter = express.Router();

// Check if the route is working
loginRouter.get("/", (req, res) => {
    console.log("Login route hit");
    return res.status(200).json({ message: "Login route hit" });
});
loginRouter.post("/", authLogin);

module.exports = loginRouter;
