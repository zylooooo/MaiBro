import { React, useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import Restaurant from "./home_components/restaurantDetails"
import BottomTab from "../common/bottomTab/bottomTab"
import "./home.css"
import TextField from "@mui/material/TextField";
import { OrderHeader, OrderTopBar } from "../common/topTab/topTab";
import { InputAdornment } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {RouterProvider, useNavigate } from "react-router-dom";
import browserRouter from "../../navigation";
import OrderStatus from "./orderStatusBar";
import { getMessaging, onMessage } from "firebase/messaging";

export function Notification() {
  const [notification, setNotification] = useState(null);
  const messaging = getMessaging();

  useEffect(() => {
    onMessage(messaging, (payload) => {
      setNotification(payload.notification);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    });
  }, []);
  

  return (
    <>
    <div>
      {notification && (
        <div className="notification">
          <strong>{notification.title}</strong>
          <div>{notification.body}</div>
        </div>
      )}
    </div>
    </>
  );
}
// App Initialization
// Starts the router for routing
export function App() {



  return (
    <>
    <RouterProvider router={browserRouter} />
    </>
  );
}

//Main Home Page
export default function HomeMain() {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  return (
    <>
      {/* Search bar */}
      <div className='mainHome'>
        <OrderTopBar userName ={name}/>
        <OrderHeader />
        <div className="search">
          <TextField
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              fullWidth
              placeholder="Search"
              color="grey"
              InputProps={{
                style: { borderRadius: "25px", backgroundColor: "#D3D3D3", },
                endAdornment:
                  <InputAdornment position="end">
                    <SearchRoundedIcon />
                  </InputAdornment>
              }}
              focused
            />
        </div>
      </div>
      <div className="restaurantList">
        <Restaurant input={inputText} />
      </div>
      <OrderStatus />
      <div>
        <BottomTab value="Order"></BottomTab>
      </div>
    </>
  )
}
