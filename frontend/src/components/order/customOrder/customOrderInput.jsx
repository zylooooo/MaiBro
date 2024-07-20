import "./customOrderInput.css";
import React, { useEffect, useState } from "react";
import { Map, Marker, APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { Button, TextField, InputAdornment } from '@mui/material';
import { ProfileTopBar, StandardHeader } from "../../common/topTab/topTab";
import { useNavigate } from "react-router-dom";
import Confirmation from "./customOrderConfirmation";
import "../../common/topTab/topTab.css";
import "../../common/bottomTab/bottomTab.css";
import BottomTab from "../../common/bottomTab/bottomTab";

// CustomMap component
const CustomMap = ({ latitude, longtitude }) => {
  const geolocation = {
    "latitude": latitude,
    "longitude": longtitude,
  }
  localStorage.setItem('address', JSON.stringify(geolocation));

  // Render the map with a marker on the chosen location
  return (
    <div className="map-container">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={17}
        center={{ lat: latitude, lng: longtitude }}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={{ lat: latitude, lng: longtitude }} />
      </Map>
    </div>
  );
}

// LocationSearch component
const LocationSearch = () => {
  const map = useMap(); // Initialize Map Instance
  const service = new google.maps.places.PlacesService(map); // Initialize places service

  // Lat (SET DEFAULT STATE)
  const [latitude, setLatitude] = useState(1.296568);
  const handleLatitudeChange = (lat) => {
    setLatitude(lat)
  };

  // Long (SET DEFAULT STATE)
  const [longtitude, setLongtitude] = useState(103.852119);
  const handleLongtitudeChange = (long) => {
    setLongtitude(long);
  };

  // SEARCH LOCATION CALL MAPS API
  const [location, setLocation] = useState("");
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Search for location Button
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
        handleLatitudeChange(results[0].geometry.location.lat());
        handleLongtitudeChange(results[0].geometry.location.lng());
        const input_name = results[0].name;
        // Store formatted_address as a separate exportable variable
        localStorage.setItem('restaurantName', location);
      }
    });
  };

  return (
    <>
      <div className="delivery-location">Restaurant Name </div>
      <TextField
        fullWidth
        id="outlined-basic"
        color="grey"
        variant="outlined"
        value={location}
        onChange={handleLocationChange}
        placeholder="Location"
        InputProps={{
          endAdornment: <InputAdornment position="end"><div onClick={handleLocationPress}>Search</div></InputAdornment>,
          style: { borderRadius: "25px", backgroundColor: '#D3D3D3', marginBottom: "7.5px", fontFamily: "Inter" },
        }}
        focused
      />
      <div className="app">
        <CustomMap latitude={latitude} longtitude={longtitude} />
      </div>
    </>
  )
}

// Store the delivery location
function DeliveryLocationStore() {
  const [delivery, setDelivery] = useState("");

  const handleInputChange = (event) => {
    setDelivery(event.target.value);
  }

  // Storing delivery location via local storage
  const handleSave = () => {
    localStorage.setItem('deliveryLocation', delivery);
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
        onChange={handleInputChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <div onClick={handleSave}>Save</div>
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

// CustomOrder component
const CustomOrder = () => {
  const navigate = useNavigate(); // Initialize the Page
  const [order, setOrder] = useState('');
  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  }

  // Submit Order
  const handleSave = () => {
    // Store order details to local storage
    const haveOrdered = sessionStorage.getItem("buyerOrdered") || false
    if (haveOrdered) {
      alert("You already have an order in progress. Please wait for it to be completed.")
      localStorage.removeItem('address')
      localStorage.removeItem('deliveryLocation')
      localStorage.removeItem('restaurantName')
      navigate("/home");
    } else {
      localStorage.setItem('order', order);
      navigate("/home/OrderConfirmation")
    }
  }

  return (
    <>
      <form>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
          <ProfileTopBar />
          <StandardHeader headerName="Custom Order" />

          {/* Created a new component for location search as I need to use useMap() which needs to be inside <APIProvider> */}
          <DeliveryLocationStore />
          <LocationSearch />
          <div style={{ marginBottom: "5em" }}>
            <TextField
              fullWidth
              placeholder="Input Order Here"
              multiline
              rows={10}
              onChange={handleOrderChange}
              color='grey'
              variant="outlined"
              InputProps={{
                style: { borderRadius: "25px", backgroundColor: '#D3D3D3', marginBottom: "10px", marginTop: "10px" }
              }}
              focused
            />
            <Button
              disableRipple
              fullWidth
              variant='contained'
              onClick={() => handleSave()}
              style={{ borderRadius: "25px", fontSize: "0.8em", marginBottom: "15px", backgroundColor: "#C6252E", height: "3.5em", textTransform: "none", fontWeight: "600" }}
            >
              Order Now!
            </Button>
          </div>
        </APIProvider>
      </form>
      <div>
        <BottomTab value="Order" />
      </div>
    </>
  );
};

export default CustomOrder;