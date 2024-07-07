import "./customOrderConfirmation.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
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
    
    let latitude = localStorage.getItem('latitude')
    let longitude = localStorage.getItem('longitude')
    
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



export default function Confirmation() {
  let name = localStorage.getItem('name')
  let address = localStorage.getItem('address')
  let delivery = localStorage.getItem('delivery')
  let order = localStorage.getItem('order')

  return (
    <div>
      <ProfileTopBar />
      <StandardHeader headerName="Order Details"/>
      <Info />
      <div className='confirmation'>
        <div className='confirmation-location'>
          <RoomServiceOutlinedIcon></RoomServiceOutlinedIcon>
          <div className='confirmation-title'>{name}</div>
        </div>
        <div className='confirmationText'>{address}</div>
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

        <Button disableRipple fullWidth variant='contained' className='confirm-button'
          style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}}
          onClick={""}>
          Confirm Order
        </Button>

      </div>

      <BottomTab />
    </div>
  )
}
