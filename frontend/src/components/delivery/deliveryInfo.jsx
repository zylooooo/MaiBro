import { React , useState } from "react";
import { ProfileTopBar } from "../common/topTab/topTab";
import { StandardHeader } from "../common/topTab/topTab";
import { useLocation, useNavigate } from "react-router-dom";
import BottomTab from "../common/bottomTab/bottomTab"
import { Button } from "@mui/material";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import RestaurantAddress from "../common/mapAPI/geocoding";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';

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

const DeliveryAccepted = ({info}) => 
    {
       const deliveryObj = info;
       return (
        <div className="buyerOrderInfoCard">
                <div className="buyerInfoText">
                    <div className="restaurantContactInfo">{deliveryObj.restaurant}</div>
                    <div className='confirmation'>
                        <RestaurantAddress latitude={deliveryObj.latitude} longitude={deliveryObj.longitude}/>
                        <div className='delivery-location'>
                        <LocalShippingOutlinedIcon />
                        <div style={{paddingLeft:"10px"}}>{deliveryObj.deliveryLocation}</div>
                        </div>
                        <div className='order'>
                        <ArticleOutlinedIcon />
                        <div style={{paddingLeft:"10px"}}>{deliveryObj.orderItems}</div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={""}>
                    Arrived at Restaurant
                    </Button>
                </div>
            </div>
       )
    }
    

const DeliveryCollected = ({info}) => 
    {
       const deliveryObj = info;
       return (
        <div className="buyerOrderInfoCard">
                <div className="buyerInfoText">
                    <div className="buyerContactInfo">
                        <LocalShippingOutlinedIcon/>
                        <div style={{paddingLeft:"10px"}}>{deliveryObj.deliveryLocation}</div>
                    </div>
                    <div className='confirmation'>
                        <div className='order'>
                        <ArticleOutlinedIcon />
                        <div style={{paddingLeft:"10px"}}>{deliveryObj.orderItems}</div>
                        </div>
                        <div className="order">
                        <AccountBalanceWalletOutlinedIcon />
                            <div style={{paddingLeft:"10px"}}>${deliveryObj.earnings}</div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={""}>
                    Order Received
                    </Button>
                </div>
            </div>
       )
    }


export default function DeliveryInfo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collected, setCollected] = useState(true)
    const deliveryObj = location.state.delivery;

    //Chat Button
    const handleChatClick = () => {
        navigate('/chat', {state: {roomId: deliveryObj.docId}});
    }


    return (
        <>
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Delivery Info"/>
        </div>
            <div className='buyerContact'>
                <div className='buyerContactTitle'>Chat with {deliveryObj.buyerId}</div>
                <div className='contact-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#143851",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={{handleChatClick}}>
                    Chat
                    </Button>
                </div>
            </div>
            <MapDisplay latitude={deliveryObj.latitude} longitude={deliveryObj.longitude}/>
            {/* INSERT IF ELSE CONDITION HERE */}
            {collected ? <DeliveryCollected info={deliveryObj}/> : <DeliveryAccepted info={deliveryObj}/>}
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </APIProvider>

        </>
    )
}