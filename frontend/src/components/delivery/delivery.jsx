import React from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"
import deliveryListings from "./deliveryListings"
import "./delivery.css"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import { Divider, Button } from "@mui/material"


export function MapDisplay({latitude, longtitude}) {
    return(
    <div className="deliveryMap">
      <Map
        defaultZoom={17}
        // Changed to center instead of defaultcenter
        st
        center={{ lat: latitude, lng: longtitude}}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={{ lat: latitude, lng: longtitude}} />
      </Map>
    </div>
    )
}


export default function Delivery() {
    

    var deliveryObjList = deliveryListings["Listings"]
    

    return (
        <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Delivery"/>
        </div>
        <div className="deliveryListings">
            {
                deliveryObjList.map((item,index) => {
                    return(
                            <div key={index} className="deliveryItem">
                                <div className="deliveryInfo">
                                    <div style={{fontWeight:"700",fontSize:"1.1em"}}>{item.restaurantName}</div>
                                    <div className="deliveryName">{item.name}</div>
                                </div>
                                <MapDisplay key={`map-${item.number}`} latitude={item.latitude} longtitude={item.longtitude}/>
                                <div className="deliveryLocation">
                                    <div style={{fontWeight:"bold"}}>Delivery Location</div>
                                    {item.deliveryLocation}
                                </div>
                                <div className="deliveryOrderDetails">
                                    <div style={{fontWeight:"bold"}}>Order Details</div>
                                    <div className="orderDetails">{item.orderDetails}</div>
                                </div>
                                <Button disableRipple fullWidth variant='contained' 
                                style={{borderRadius: "25px", fontSize:"0.9em",marginTop:"15px",marginBottom:"15px",backgroundColor:"#133851",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                                    Bro Them Up!
                                </Button>
                                <Divider variant="middle" component="div" style={{margin:"10px"}}/>
                            </div>   
                    )
                })
            }
        </div>
        
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </APIProvider>
        </>
    )
}