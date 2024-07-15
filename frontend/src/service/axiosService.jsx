import axiosInstance from "../utils/axiosInstance";

//Functions to send requests to backend
async function submitSignup(body) {
  // Send request to the backend to get a avaialble orders
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
  // Return the list of avaialble orders
  return true;
}

//Functions to send requests to backend
async function submitLogin(body) {
  // Send request to the backend to get a avaialble orders
  try {
    const res = await axiosInstance({
      method: "post",
      url: "/login",
      data: body,
    });
  } catch (error) {
    return false
  }
  // Return the list of avaialble orders
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
  // Send request to the backend to get a list of restaurants currently opened
  const res = await axiosInstance({
    method: "get",
    url: "/order-list/",
  });

  // Return the list of restaurants
  return res.data;
}

async function getRestaurantMenu(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "get",
    url: "/order-menu",
    params: body,
  });

  // Return the response JSON
  return res.data;
}

async function submitOrder(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "post",
    url: "/submit-order/",
    data: body,
  });

  // Return the list of avaialble orders
  return res;
}

async function buyerStatusBar(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "get",
    url: "/order-status/statusbar",
    params: body,
  });

  // Return the list of avaialble orders
  return res.data;
}

async function buyerOrderStatus(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "get",
    url: "/order-status/buyer",
    params: body,
  });

  // Return the list of avaialble orders
  return res.data;
}

async function broOrderStatus(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "get",
    url: "/order-status/bro",
    params: body,
  });

  // Return the list of avaialble orders
  return res.data;
}

async function orderCompleted(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "put",
    url: "/order-completed/",
    data: body,
  });

  // Return the list of avaialble orders
  return res.data;
}

async function orderAccepted(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "put",
    url: "/order-accepted/",
    data: body,
  });

  // Return the list of avaialble orders
  return res.data;
}

async function historyList(body) {
  // Send request to the backend to get a avaialble orders
  const res = await axiosInstance({
    method: "get",
    // Fill up URL HERE
    url: "",
    // BODY Value is a object containing the userName {userName: }
    params: body,
  });

  // Return the list of avaialble orders
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
    orderAccepted,
    historyList,
};