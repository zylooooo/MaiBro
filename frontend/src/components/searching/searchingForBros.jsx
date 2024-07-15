import { React, useEffect, useLayoutEffect, useState } from "react";
import "./searchingForBros.css";
import "../common/topTab/topTab.css";
import {Button,TextField, InputAdornment} from '@mui/material';
import { buyerOrderStatus } from "../../service/axiosService";
import BottomTab from "../common/bottomTab/bottomTab";
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Searching from './images/Searching.png'
import Purchasing from './images/Purchasing.png'
import RestaurantAddress from '../common/mapAPI/geocoding.jsx'
import { useLocation } from "react-router-dom";



const Address = () => {
    let coordinates = localStorage.getItem('address')
    const addressObj = JSON.parse(coordinates)
    const latitude = addressObj.latitude
    const longitude = addressObj.longitude
    const address = RestaurantAddress({latitude, longitude})
    return address
}

const SearchingForBros = () =>{

    let name = localStorage.getItem('name')
    let delivery = localStorage.getItem('delivery')
    let order = localStorage.getItem('order')

    return (
        <div className="searchingForBros">
            <div className="searchingForBrosHeader">
                <h2 className="searchingForBrosTitle">Searching...</h2>
                <img src={Searching} className='pic_time' alt=''></img>
            </div>
            <div className="searchingForBrosBody">
                <div className="searchingForBrosBodyText">
                    <h1 className="searchingForBrosBodyTitle">Your Order</h1>
                    <div className='confirmation'>
                        <div className='confirmation-location'>
                        <RoomServiceOutlinedIcon></RoomServiceOutlinedIcon>
                        <div className='confirmation-title'>{name}</div>
                        </div>
                        <Address/>
                        <div className='delivery-location'>
                        <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
                        <div className='delivery-title'>Delivery Location</div>
                        </div>
                        <div className='delivery-place'>{delivery}</div>
                        <div className='order'>
                        <ArticleOutlinedIcon></ArticleOutlinedIcon> 
                        <div className='order-details'>Order Details</div>
                        </div>
                        <div className='order-list'>{order}</div>

                    </div>
                </div>
                <div style={{ marginBottom: "5em" }}>
                        <Button disableRipple fullWidth variant='contained' 
                                style={{borderRadius: "25px", fontSize:"0.8em",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}} >
                                    Cancel Order
                        </Button>
                        </div>
            </div>
            <div>
                <BottomTab />
            </div>
        </div>
    );
}

const BroFound = () => {

    let name = localStorage.getItem('name')
    let delivery = localStorage.getItem('delivery')
    let order = localStorage.getItem('order')

    return(
        <div className="searchingForBros">
            <div className="searchingForBrosHeader">
                <h2 className="searchingForBrosTitle">Purchasing Your Food...</h2>
                <img src={Purchasing} className='pic_time' alt=''></img>
            </div>
            <div className='broContact'>
                <div className='broContactTitle'>Bro's Contact</div>
                <div className='contact-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#143851",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={""}>
                    Chat
                    </Button>
                </div>
            </div>
            <div className="searchingForBrosBody">
                <div className="searchingForBrosBodyText">
                    <h2 className="searchingForBrosBodyTitle">Your Order</h2>
                    <div className='confirmation'>
                        <div className='confirmation-location'>
                        <RoomServiceOutlinedIcon></RoomServiceOutlinedIcon>
                        <div className='confirmation-title'>{name}</div>
                        </div>
                        <Address    />
                        <div className='delivery-location'>
                        <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
                        <div className='delivery-title'>Delivery Location</div>
                        </div>
                        <div className='delivery-place'>{delivery}</div>
                        <div className='order'>
                        <ArticleOutlinedIcon></ArticleOutlinedIcon> 
                        <div className='order-details'>Order Details</div>
                        </div>
                        <div className='order-list'>{order}</div>

                    </div>
                </div>
                <div className='cancel-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={""}>
                    Complete Order
                    </Button>
                </div>
            </div>
            <div>
                <BottomTab />
            </div>
        </div>
    )
}

export default function BroUpdate() {
    const [foundBro, setFoundBro] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(false);
    const docId = useLocation().state.docId;
    console.log(docId)
    const [isVisible, setIsVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    
    useEffect(() => {
        function updatePage(orderInfo){
            console.log(orderInfo.orderAccepted)
            if(orderInfo.orderAccepted === true){
                setFoundBro(true)
            }
            if (orderInfo.orderCollected === true) {
                setCompletedOrder(true)
            }
        }

        async function getStatus(docId) {
            const body = {
                docId: docId
            }
            await buyerOrderStatus(body).then((response) => { 
                if (response.length === 0) {
                    console.log("nooooo")
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                    console.log("lmaoooo")
                    setOrderInfo(response);
                    console.log(response)
                    updatePage(response)
                }
            });
        }
        getStatus(docId);
    },[])
    
    return (
        <>
        {foundBro ? <BroFound /> : <SearchingForBros />}
        </>
    );
}
