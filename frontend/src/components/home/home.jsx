import { React, useState } from "react";
import Restaurant from "./home_components/restaurantDetails"
import BottomTab from "../common/bottomTab/bottomTab"
import "./home.css"
import TextField from "@mui/material/TextField";
import { OrderHeader, OrderTopBar } from "../common/topTab/topTab";
import { InputAdornment } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {RouterProvider, useNavigate } from "react-router-dom";
import browserRouter from "../../navigation";

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

  const navigate = useNavigate();
  

  return (
    <>
      {/* Search bar */}
      <OrderTopBar />
      <OrderHeader />
      <div className="mainHome">
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
        <Restaurant input={inputText} />
      </div>
      <div>
        <section className="restaurant-list">
        </section>
      </div>
      <div>
        <BottomTab value="Order"></BottomTab>
      </div>
    </>
  )
}
