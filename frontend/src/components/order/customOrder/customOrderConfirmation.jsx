import "./customOrderConfirmation.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import {useNavigate} from "react-router-dom";
import OrderStore from "./customOrderInput";
import "../../common/topTab/topTab.css";
import BottomTab from "../../common/bottomTab/bottomTab";
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';


const CustomMap = ({lati,longt}) => {
    // create markerLocation using coordinates of chosen location
  const [markerLocation, setMarkerLocation] = useState({
    lat: Number(lati),
    lng: Number(longt),
  });
  

  return (
    // shows map with marker on chosen location
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={17}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
}

const Info = () => {
    //getting data from local storage that was inputted in customOrderInput
    let address = localStorage.getItem('address')
    const addressObj = JSON.parse(address)
    const latitude = addressObj.latitude
    const longitude = addressObj.longitude
    
    return (
        <div className="app">
            <></>
          {/* calling CustomMap function */}
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <CustomMap lati={latitude} longt={longitude}    />
          </APIProvider>
        </div>
      );
}


//initializing the confirmation page
export default function Confirmation() {
  // Obtain information from local/session storage for display on confirmation page
  let name = sessionStorage.getItem('userName') == null ? "User": sessionStorage.getItem('userName');
  let restaurantName = localStorage.getItem('restaurantName')
  let delivery = localStorage.getItem('deliveryLocation')
  let order = localStorage.getItem('order')
  const navigate = useNavigate();

  //Function to send data to backend to confirm order
  function sendOrderBackend(){}

  return (
    <div>
      <ProfileTopBar />
      <StandardHeader headerName="Order Details"/>
      <Info />
      <form>
      <div className='confirmation'>
        <div className='confirmation-location'>
          <RoomServiceOutlinedIcon></RoomServiceOutlinedIcon>
          <div className='confirmation-title'>{restaurantName}</div>
        </div>
        <div className='confirmationText'>{}</div>
        <div className='delivery-location'>
          <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
          <div className='delivery-title'>Delivery Location</div>
        </div>
        <div className='delivery-place'>{delivery}</div>
        <div className='order'>
          <ArticleOutlinedIcon></ArticleOutlinedIcon> 
          <div className='order-details'>Order Details</div>
        </div>
        <div className='order-list'>{order}</div>
        <div>
        <Button disableRipple fullWidth variant='contained'  onClick={() => navigate("/home/searchingForBros")}  className='confirm-button'
          style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}}>
          Confirm Order
        </Button>
        </div>
        
      </div>
      </form>
      <div className='bottomTab'>
      <BottomTab value='bottom'/>
      </div>

    </div>
  )
}
