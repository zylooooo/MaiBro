import "./customOrderInput.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import {Button,TextField, InputAdornment} from '@mui/material';
import {ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import LocationGetter from "./customOrderConfirmation";
import "../../common/topTab/topTab.css";
import "../../common/bottomTab/bottomTab.css"
import BottomTab from "../../common/bottomTab/bottomTab";


const CustomMap = ({latitude,longtitude}) => {
  // shows marker on chosen location

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
  const [latitude, setLatitude] = useState(1.296568);
  const handleLatitudeChange = (lat) => {
    setLatitude(lat)
  };

  //Long (SET DEFAULT STATE)
  const [longtitude, setLongtitude] = useState(103.852119);
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
      const formattedAddress = results[0].formatted_address;
      const input_name = results[0].name;
      // Store formatted_address as a separate exportable variable
      NewInformation(formattedAddress, input_name, results[0].geometry.location.lng(), results[0].geometry.location.lat());
    }})

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


const Delivery = () => {
  const [location, setLocation] = useState("");
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  return (
    <>
      
      <div className="delivery-location">Delivery Location </div>
      <TextField
        fullWidth
        id="outlined-basic"
        color="grey"
        variant="outlined"
        placeholder="Input Delivery Location Here"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <div onClick={() => handleLocationChange()}>Save</div>
            </InputAdornment>
          ),
          style: {
            borderRadius: "25px",
            backgroundColor: "#D3D3D3",
            marginBottom: "7.5px",
            fontFamily: "Inter",
          },
        }}
        focused
      />
    </>
  );
};

const CustomOrder = () => {
  //Initialise the Page
  return (
    <>
        <APIProvider apiKey="AIzaSyCXV5ytv98uxdC8R3_krSY0S4cTkzhOq-g">
        <ProfileTopBar/>
        <StandardHeader headerName="Custom Order"/>
        <Delivery/>
        <LocationGetter data={location} />
        <div className="delivery-location">Restaurant Name </div>
        {/* //Created a new component for location search as i need to use useMap() which needs to be inside <APIProvider> */}     
        <LocationSearch />
        <Button disableRipple fullWidth variant='contained' 
                    style={{borderRadius: "25px", fontSize:"0.8em",marginTop:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                        +Add Food
        </Button>
        <BottomTab></BottomTab>
        </APIProvider>
        
    </>
  );
};

export default CustomOrder;

//inputting information of location into local storage
const NewInformation = (address, name, longitude, latitude) => {
  localStorage.setItem('address', address);
  localStorage.setItem('name', name);
  localStorage.setItem('longitude', longitude);
  localStorage.setItem('latitude', latitude);
}
