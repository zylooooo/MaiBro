import { React, useEffect, useState} from "react"
import BottomTab from "../common/bottomTab/bottomTab"
import { ProfileTopBar, StandardHeader } from "../common/topTab/topTab"
import deliveryListings from "./deliveryListings"
import "./delivery.css"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import { Divider, Button } from "@mui/material"
import {broOrderStatus, getAllAvailableOrders} from "../../service/axiosService"
import { useNavigate } from "react-router-dom"


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


export default function Delivery() {
    const navigate = useNavigate();
    const userName = sessionStorage.getItem("userName");
    //Check if user has a delivery in progress
    //If yes, route to delivery page
    //If no, route to delivery listings page
    const [currentDelivery, setCurrentDelivery] = useState([])

    useEffect(() => { 
        async function deliveryInProgress(userName){
            const body = {
                userName: userName
            }
            await broOrderStatus(body).then((response) => {
                if (response.length === 0) {
                    setCurrentDelivery([])
                } else {
                    setCurrentDelivery(response)
                }
            })
        }
        deliveryInProgress(userName)
    },[])


    if (!currentDelivery.length == 0) {
        //Navigate to new delivery page passing the delivery as a prop to the new page 
        navigate("/delivery/info", {state: {delivery: currentDelivery}})
    }


    //Obtain list of available orders
    const [deliveryList, setDeliveryList] = useState([])

    useEffect(() => { 
        async function getDeliveryList() {
            await getAllAvailableOrders().then((response) => {
                if (response === undefined) {
                    console.log("No Data");
                } else {
                    setDeliveryList(response);
                }
            })
        }
        getDeliveryList();
        
    }, [])
    
    return (
        <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Delivery"/>
        </div>
        <div className="deliveryListings">
            {
                deliveryList.map((item,index) => {
                    return(
                            <div key={index} className="deliveryItem">
                                <div className="deliveryInfo">
                                    <div style={{fontWeight:"700",fontSize:"1.1em"}}>{item.restaurant}</div>
                                    <div className="deliveryName">{item.buyerId}</div>
                                </div>
                                <MapDisplay key={`map-${item.number}`} latitude={item.latitude} longitude={item.longitude}/>
                                <div className="deliveryLocation">
                                    <div style={{fontWeight:"bold"}}>Delivery Location</div>
                                    {item.deliveryLocation}
                                </div>
                                <div className="deliveryOrderDetails">
                                    <div style={{fontWeight:"bold"}}>Order Details</div>
                                    <div className="orderDetails">{item.orderItems}</div>
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