import { React, useState } from "react";
import Restaurant from "./home_components/restaurantDetails"
import BottomTab from "../common/bottomTab/bottomTab"
import "./home.css"
import TextField from "@mui/material/TextField";
import { OrderTopBar, ProfileTopBar } from "../common/topTab/topTab";
import { Icon, InputAdornment } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


export default function App() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };
  {/* Search bar */}
    return (
        <>
        {/* Search bar */}
        <ProfileTopBar />
        <OrderTopBar />
      <div className="main">
        <div className="search">
          <TextField
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            fullWidth
            placeholder="Search"
            color="grey"
            InputProps={{ style: { borderRadius: "25px",backgroundColor: "#D3D3D3",}, 
            endAdornment: 
              <InputAdornment position="end">
                <SearchRoundedIcon/>
              </InputAdornment>}}
            focused
          />
        </div>
        <Restaurant input={inputText} />
      </div>
      {/* Bring in bottom Tab */}
        <Home></Home>
      </>
    );
  }


//Bottom Tab
export function Home() {
    
    return (
        <div>
            <div>
                <section className="restaurant-list">
                </section>
            </div>
            <div>
              <BottomTab value="Order"></BottomTab>
            </div>
        </div>
    )
}
