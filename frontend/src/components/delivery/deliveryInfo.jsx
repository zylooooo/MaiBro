import { React } from "react";
import { ProfileTopBar } from "../common/topTab/topTab";
import { StandardHeader } from "../common/topTab/topTab";
import { useLocation } from "react-router-dom";
import BottomTab from "../common/bottomTab/bottomTab"
import { Button } from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"

export function MapDisplay({latitude, longitude}) {
    return(
    <div className="deliveryMap">
      <Map
        defaultZoom={17}
        // Changed to center instead of defaultcenter
        st
        center={{ lat: latitude, lng: longitude}}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={{ lat: latitude, lng: longitude}} />
      </Map>
    </div>
    )
}

export default function DeliveryInfo() {
    const location = useLocation();
    const deliveryObj = location.state.delivery[0];

    return (
        <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Delivery Info"/>
        </div>
        <div className="deliveryListings">
            <div className="deliveryItem">
                <div className="deliveryInfo">
                    <div style={{fontWeight:"700",fontSize:"1.1em"}}>{deliveryObj.restaurant}</div>
                    <div className="deliveryName">{deliveryObj.buyerId}</div>
                </div>
                <MapDisplay latitude={deliveryObj.latitude} longitude={deliveryObj.longitude}/>
                <div className="deliveryLocation">
                    <div style={{fontWeight:"bold"}}>Delivery Location</div>
                    {deliveryObj.deliveryLocation}
                </div>
                <div className="deliveryOrderDetails">
                    <div style={{fontWeight:"bold"}}>Order Details</div>
                    <div className="orderDetails">{deliveryObj.orderItems}</div>
                </div>
                <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.9em",marginTop:"15px",marginBottom:"15px",backgroundColor:"#133851",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                    Chat with Buyer
                </Button>
                <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.9em",marginTop:"15px",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                    Order Collected at Restaurant
                </Button>
            </div>  
        </div>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </APIProvider>

        </>
    )
}