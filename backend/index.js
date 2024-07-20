const express = require("express");
const cors = require("cors");
const http = require("http");
const { initSocket } = require("./config");

// Server settings
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());

// Initialise the socket.io server
const server = http.createServer(app);
const io = initSocket(server);


// Connect to the all the routers
app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Server is up and running!"
    });
});

app.use("/login", require("./routers/loginRouter"));
app.use("/signup", require("./routers/signupRouter"));
app.use("/restaurant-list", require("./routers/restaurantListRouter"));
app.use("/submit-order", require("./routers/submitOrderRouter"));
app.use("/history", require("./routers/historyRouter"));
app.use("/order-list", require("./routers/orderListRouter"));
app.use("/order-accepted", require("./routers/orderAcceptedRouter"));
app.use("/order-completed", require("./routers/orderCompletedRouter"));
app.use("/order-collected", require("./routers/orderCollectedRouter"));
app.use("/order-menu", require("./routers/orderMenuRouter"));
app.use("/order-status", require("./routers/orderStatusRouter"));
app.use("/chat", require("./routers/chatRouter"));
app.use("/notification", require("./routers/notificationRouter"));

// Start the application
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});