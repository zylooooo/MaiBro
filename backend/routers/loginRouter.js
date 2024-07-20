const express = require("express");
const { authLogin } = require("../controllers/loginController");

const loginRouter = express.Router();

loginRouter.get("/health", async (req, res) => {
    return res.status(200).json({ message: "Login route hit" });
});
loginRouter.post("/", authLogin);

module.exports = loginRouter;
