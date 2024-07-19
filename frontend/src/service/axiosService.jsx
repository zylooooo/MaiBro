import axiosInstance from "../utils/axiosInstance";

//Functions to send requests to backend
async function submitSignup(body) {
  // Send request to the backend to create a new user
  try {
    const res = await axiosInstance({
      method: "post",
      url: "/signup",
      data: body,
    });
  } catch (error) {
    console.log(error)
    return false
  }

  return true;
}

//Functions to send requests to backend
async function submitLogin(body) {
  // Send request to the backend to check login details (esp token)
  try {
    const res = await axiosInstance({
      method: "post",
      url: "/login",
      data: body,
    });
  } catch (error) {
    return false
  }

  return true;
}

async function getAllRestaurant() {
  // Send request to the backend to get a list of restaurants currently opened
  const res = await axiosInstance({
    method: "get",
    url: "/restaurant-list/",
  });

  // Return the list of restaurants
  return res.data;
}

async function getAllAvailableOrders() {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "get",
    url: "/order-list/",
  });

  // Return the list of restaurants
  return res.data;
}

async function getRestaurantMenu(body) {
  // Send request to the backend to get restaurant menu
  const res = await axiosInstance({
    method: "get",
    url: "/order-menu",
    params: body,
  });

  // Return the response JSON
  return res.data;
}

async function submitOrder(body) {
  // Send request to the backend to submit order details
  const res = await axiosInstance({
    method: "post",
    url: "/submit-order/",
    data: body,
  });

  return res;
}

async function buyerStatusBar(body) {
  // Send request to the backend to get order status for status bar
  const res = await axiosInstance({
    method: "get",
    url: "/order-status/statusbar",
    params: body,
  });

  return res.data;
}

async function buyerOrderStatus(body) {
  // Send request to the backend to get order status (buyer)
  const res = await axiosInstance({
    method: "get",
    url: "/order-status/buyer",
    params: body,
  });

  return res.data;
}

async function broOrderStatus(body) {
  // Send request to the backend to get order status (bro)
  const res = await axiosInstance({
    method: "get",
    url: "/order-status/bro",
    params: body,
  });


  return res.data;
}

async function orderCompleted(body) {
  // Send request to the backend to complete the order
  const res = await axiosInstance({
    method: "post",
    url: "/order-completed/",
    data: body,
  });

  return res;
}

async function orderAccepted(body) {
  // Send request to the backend to accept the order
  const res = await axiosInstance({
    method: "put",
    url: "/order-accepted/",
    data: body,
  });

  return res;
}

async function orderCollected(body) {
  // Send request to the backend to accept the order collection
  const res = await axiosInstance({
    method: "put",
    url: "/order-collected/",
    data: body,
  });

  return res;
}

async function historyList(body) {
  // Send request to the backend to get history list
  const res = await axiosInstance({
    method: "get",
    url: "/history",
    params: body,
  });
  // Return the list of avaialble orders
  return res.data;
}

async function sendNotification(body) {
  // Send request to the backend to send notif
  const res = await axiosInstance({
    method: "post",
    url: "/notification/",
    data: body,
  });

  return res;
}

async function createChatRoom(body) {
  // Send request to the backend to create database for chatroom
  const res = await axiosInstance({
    method: "post",
    url: "/chat/",
    data: body,
  });

  return res;
}

async function getAllMessages(body) {
  // Send request to the backend to create database for chatroom
  const res = await axiosInstance({
    method: "get",
    url: "/chat/messages",
    params: body,
  });

  return res.data;
}

export {
    submitSignup,  
    submitLogin,
    getAllRestaurant,
    getRestaurantMenu,
    getAllAvailableOrders,
    submitOrder,
    buyerOrderStatus,
    broOrderStatus,
    buyerStatusBar,
    orderCompleted,
    orderCollected,
    orderAccepted,
    historyList,
    sendNotification,
    createChatRoom,
    getAllMessages,
};