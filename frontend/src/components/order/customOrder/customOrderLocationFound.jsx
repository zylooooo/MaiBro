import "./customOrderLocationFound.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import "../../common/topTab/topTab.css";
import BottomTab from "../../common/bottomTab/bottomTab";


const CustomMap = ({lati,longt}) => {
    // shows marker on chosen location by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: Number(lati),
    lng: Number(longt),
  });
  

  return (
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
    let address = localStorage.getItem('address')
    let latitude = localStorage.getItem('latitude')
    let longitude = localStorage.getItem('longitude')
    let name = localStorage.getItem('name')
    
    return (
        <div className="app">
            {name}
            <></>
          <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
            <CustomMap lati={latitude} longt={longitude}    />
          </APIProvider>
        </div>
      );

}


const AddFn = ({ addInputPair }) => {
    return (
      <button className="add-button" onClick={addInputPair} disableRipple fullWidth variant='contained'style={{width:"100%", borderRadius: "25px", border: "none", fontSize:"0.8em",marginTop:"15px",backgroundColor:"#133851",height:"3.5em",textTransform:"none",fontWeight:"600", color:"white"}}>
        Add Input Field Pair
      </button>
    );
  };
  
const Menu = () => {
const [inputPairs, setInputPairs] = useState([]);

const addInputPair = () => {
    setInputPairs([...inputPairs, { id: inputPairs.length }]);
};

return (
    <div>
    <div className="title">
        <p className="FoodItem">Food Item</p>
        <p className="qty">Qty</p>
    </div>
    
    <div id="inputFields">
        {inputPairs.map((pair) => (
        <div key={pair.id} className="input-pair-wrapper">
            <div className="input-wrapper">
            <input
                type="text"
                className="input-field1"
            />
            <input
                type="text"
                className="input-field2"
            />
            </div>
        </div>
        ))}
    </div>
    <AddFn addInputPair={addInputPair}  />
    <Button disableRipple fullWidth variant='contained' 
                    style={{borderRadius: "25px", fontSize:"0.8em",marginTop:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                        Confirm Order
        </Button>
    </div>
);
};
  

const Order = () => {
    return (
        <div>
            <ProfileTopBar />
            <StandardHeader headerName="Custom Order"/>
            <Info />
            <Menu />
            <BottomTab></BottomTab>
        </div>
    );
}

export default Order;