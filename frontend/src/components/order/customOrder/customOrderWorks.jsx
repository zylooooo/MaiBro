import "./customOrder.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import "../../common/topTab/topTab.css";


const CustomMap = ({latitude,longtitude}) => {
  // shows marker on London by default (removed this useState idk why it didnt work with it so i just indiv used the variables passed in)
  // const [markerLocation, setMarkerLocation] = useState({
  //   lat: latitude,
  //   lng: longtitude,
  // });

  return (
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={17}
        // Changed to center instead of defaultcenter
        center={{ lat: latitude, lng: longtitude}}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={{ lat: latitude, lng: longtitude}} />
      </Map>
    </div>
  );
}

const LocationSearch = () => {
  // Initialise Map Instnace
  const map = useMap();
  // Initialise places service
  const service = new google.maps.places.PlacesService(map);

  
  //Lat (SET DEFAULT STATE)
  const [latitude, setLatitude] = useState(51.509865);
  const handleLatitudeChange = (lat) => {
    setLatitude(lat)
  };

  //Long (SET DEFAULT STATE)
  const [longtitude, setLongtitude] = useState(-0.118092);
  const handleLongtitudeChange = (long) => {
    setLongtitude(long);
  };

  //SEARCH LOCATION CALL MAPS API
  const [location, setLocation] = useState("");
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleLocationPress = () => {
    // Define the request
    const request = {
      query: location,
      fields: ['name', 'formatted_address', 'geometry'],
    };

    // Use the findplaceQuery to get the FIRST location queried
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Set the location
        console.log(results)
        handleLatitudeChange(results[0].geometry.location.lat());
        handleLongtitudeChange(results[0].geometry.location.lng());
      }
    })

  };

  return (
        <>
        <TextField fullWidth id="outlined-basic" color="grey" variant="outlined" value={location} onChange={handleLocationChange} placeholder="Location"
                    InputProps={{endAdornment:<InputAdornment position="end"><div onClick={handleLocationPress}>Search</div></InputAdornment>, style: {borderRadius: "25px",backgroundColor: '#D3D3D3', marginBottom:"7.5px",fontFamily:"Inter",
                    }}} focused/>
        <div className="app">
            <CustomMap latitude={latitude} longtitude={longtitude}/>
        </div>
        </>
  )

}
const CustomOrder = () => {
  //Initialise the Page
  return (
    <>
        <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
        <ProfileTopBar/>
        <StandardHeader headerName="Custom Order"/>
        {/* //Created a new component for location search as i need to use useMap() which needs to be inside <APIProvider> */}
        <LocationSearch />
        </APIProvider>
        
    </>
  );
};

export default CustomOrder;

