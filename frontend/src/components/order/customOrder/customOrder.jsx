import "./customOrder.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import ProfileTopBar from "../../common/topTab/topTab";
import "../../common/topTab/topTab.css";
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
  } from "react-geocode";


const CustomMap = () => {
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 51.509865,
    lng: -0.118092,
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

//use google maps api to convert location to coordinates
// function Page(){
//     return(
//     <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
//         <Geocoding />
//     </APIProvider>
//     );
// }

// function Geocoding(){
//     const geocodingApiLoaded = useMapsLibrary("geocoding");
//     const [geocodingService, setGeocodingService] = useState<google.maps.Geocoder>();

//     useEffect(() => {
//         if(!geocodingApiLoaded) return;
//         setGeocodingService(new window.google.maps.Geocoder());
//     }, [geocodingApiLoaded]);

//     if(!geocodingService) return <div>Loading...</div>;

//     return <div>Geocoding</div>
//}

const CustomOrder = () => {
  return (
    <>
        <ProfileTopBar></ProfileTopBar>
        <TextField fullWidth id="outlined-basic" color="grey" variant="outlined" value="location"
                    InputProps={{endAdornment:<InputAdornment position="end"><div onClick={{}}>Search</div></InputAdornment>, style: {borderRadius: "25px",backgroundColor: '#D3D3D3', marginBottom:"7.5px",fontFamily:"Inter",
                    }}} focused/>
        <div className="app">
        <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
            <CustomMap />
        </APIProvider>
        </div>
    </>
  );
};

export default CustomOrder;

