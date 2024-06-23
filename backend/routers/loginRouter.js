const express = require("express");
const { verifyLogin } = require("../controllers/loginController");

const loginRouter = express.Router();

loginRouter.post("/login", verifyLogin);

module.exports = loginRouter;
