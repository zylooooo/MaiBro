import "./customOrderLocationFound.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import { useNavigate } from "react-router-dom";
import "../../common/topTab/topTab.css";
import BottomTab from "../../common/bottomTab/bottomTab";


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
    let latitude = localStorage.getItem('latitude')
    let longitude = localStorage.getItem('longitude')
    let name = localStorage.getItem('name')
    
    return (
        <div className="app">
            {name}
            <></>
          {/* calling CustomMap function */}
          <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
            <CustomMap lati={latitude} longt={longitude}    />
          </APIProvider>
        </div>
      );
}
  
//Initialise the Page
const Order = () => {
    const [order, setOrder] = useState('');
    const handleOrderChange = (event) => {
      setOrder(event.target.value);
    }
    const handleSave = () => {
      localStorage.setItem('order', order);
      navigate("/home/customOrderConfirmation")
    }
    const navigate = useNavigate();
    return (
      <div>
        <ProfileTopBar />
        <StandardHeader headerName="Custom Order"/>
        <Info />
        <div className='customOrderDetails'>
          <TextField
            fullWidth placeholder="Input Order Here"
            multiline rows={10} maxRows={Infinity} onChange={handleOrderChange}
            color='grey' variant="outlined"
            InputProps={{style: {borderRadius: "25px", backgroundColor: '#D3D3D3'}}}
            focused
          />
        </div>
        <div className='customOrderButton'>
          <Button disableRipple fullWidth variant='contained' 
          style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}}
          onClick={handleSave}>
          Confirm Order
        </Button>
        </div>
        <div className='bottomTab'>
          <BottomTab  />
        </div>
      </div>
    );
}

export default Order;