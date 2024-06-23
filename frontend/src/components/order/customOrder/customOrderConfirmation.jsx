import "./customOrderConfirmation.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import { LocationStore } from "./customOrderInput";
import "../../common/topTab/topTab.css";
import BottomTab from "../../common/bottomTab/bottomTab";
import LocationStore from "./customOrderInput";


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
          <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
            <CustomMap lati={latitude} longt={longitude}    />
          </APIProvider>
        </div>
      );
}

const LocationGetter = ({ LocationStore }) => {
    console.log(LocationStore)
}
const Confirmation = () => {
    let name = localStorage.getItem('name')
    let address = localStorage.getItem('address')
    let delivery = localStorage.getItem('delivery')
    LocationGetter({ LocationStore })

    return (
        <div>
            <ProfileTopBar />
            <StandardHeader headerName="Order Details"/>
            <Info />
            <div className='confirmation'>
                <div className='confirmation-location'>
                    <div className='confirmation-title'>{name}</div>
                    <div className='confirmationText'>{address}</div>
                </div>
                <div className='delivery-location'>
                    <div className='delivery-title'>Delivery Location</div>
                    <div className='delivery-place'>{delivery}</div>
                </div>
                <div className='order'>
                    <div className='order-details'>Order Details</div>
                    <div className='order-list'></div>
                </div>
            </div>
            <BottomTab />
        </div>
    )
}

export default Confirmation;