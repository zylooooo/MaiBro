import { React, useEffect, useLayoutEffect, useState } from "react";
import "./searchingForBros.css";
import "../common/topTab/topTab.css";
import { Button, TextField, InputAdornment } from '@mui/material';
import { buyerOrderStatus, orderCompleted } from "../../service/axiosService";
import BottomTab from "../common/bottomTab/bottomTab";
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Searching from './images/Searching.png';
import Purchasing from './images/Purchasing.png';
import RestaurantAddress from '../common/mapAPI/geocoding.jsx';
import { useLocation, useNavigate } from "react-router-dom";

// Component to display the address based on latitude and longitude
const Address = ({ latitude, longitude }) => {
    const address = RestaurantAddress({ latitude, longitude });
    return address;
}

// Component for the SearchingForBros page
const SearchingForBros = ({ delivery }) => {
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
                            <div className='confirmation-title'>{delivery.restaurant}</div>
                        </div>
                        <Address latitude={delivery.latitude} longitude={delivery.longitude} />
                        <div className='delivery-location'>
                            <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
                            <div className='delivery-title'>Delivery Location</div>
                        </div>
                        <div className='delivery-place'>{delivery.deliveryLocation}</div>
                        <div className='order'>
                            <ArticleOutlinedIcon></ArticleOutlinedIcon>
                            <div className='order-details'>Order Details</div>
                        </div>
                        <div className='order-list'>{delivery.orderItems}</div>
                    </div>
                </div>
                <div style={{ marginBottom: "5em" }}>
                    <Button disableRipple fullWidth variant='contained'
                        style={{ borderRadius: "25px", fontSize: "0.8em", marginBottom: "15px", backgroundColor: "#C6252E", height: "3.5em", textTransform: "none", fontWeight: "600" }} >
                        Cancel Order
                    </Button>
                </div>
            </div>
            <div>
                <BottomTab value="Order" />
            </div>
        </div>
    );
}

// Component for the BroFound page
function BroFound({ delivery }) {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate('/chat', { state: { delivery: delivery } });
    }

    const handleCompletedClick = async () => {
        // Call the axios function to update the order status to completed
        const status = await orderCompleted({ orderId: delivery.docId });
        if (status.status === 200) {
            navigate('/home');
        } else {
            alert("Error updating order status");
        }
    }

    return (
        <div className="searchingForBros">
            <div className="searchingForBrosHeader">
                <h2 className="searchingForBrosTitle">Purchasing Your Food...</h2>
                <img src={Purchasing} className='pic_time' alt=''></img>
            </div>
            <div className='broContact'>
                <div className='broContactTitle'>Bro's Contact</div>
                <div className='contact-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                        style={{ borderRadius: "25px", fontSize: "0.8em", backgroundColor: "#143851", height: "3.5em", textTransform: "none", fontWeight: "1000" }}
                        onClick={handleChatClick}>
                        Chat
                    </Button>
                </div>
            </div>
            <div className="searchingForBrosBody">
                <div className="searchingForBrosBodyText">
                    <div className="searchingForBrosBodyTitle">Your Order</div>
                    <div className='confirmation'>
                        <div className='confirmation-location'>
                            <RoomServiceOutlinedIcon></RoomServiceOutlinedIcon>
                            <div className='confirmation-title'>{delivery.restaurant}</div>
                        </div>
                        <Address latitude={delivery.latitude} longitude={delivery.longitude} />
                        <div className='delivery-location'>
                            <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
                            <div className='delivery-title'>Delivery Location</div>
                        </div>
                        <div className='delivery-place'>{delivery.deliveryLocation}</div>
                        <div className='order'>
                            <ArticleOutlinedIcon></ArticleOutlinedIcon>
                            <div className='order-details'>Order Details</div>
                        </div>
                        <div className='order-list'>{delivery.orderItems}</div>
                    </div>
                </div>
                <div className='cancel-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                        style={{ borderRadius: "25px", fontSize: "0.8em", backgroundColor: "#C6252E", height: "3.5em", textTransform: "none", fontWeight: "1000" }}
                        onClick={handleCompletedClick}
                    >
                        Complete Order
                    </Button>
                </div>
            </div>
            <div>
                <BottomTab value="Order" />
            </div>
        </div>
    )
}

// Main component for BroUpdate
export default function BroUpdate() {
    const navigate = useNavigate();
    const [foundBro, setFoundBro] = useState(false);
    const [completedOrder, setCompletedOrder] = useState(false);
    const docId = useLocation().state.docId;

    const [isVisible, setIsVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);

    useEffect(() => {
        function updatePage(orderInfo) {
            if (orderInfo.orderAccepted === true) {
                setFoundBro(true);
            }
            if (orderInfo.orderCollected === true) {
                setCompletedOrder(true);
            }
        }

        async function getStatus(docId) {
            const body = {
                docId: docId
            }
            await buyerOrderStatus(body).then((response) => {
                if (response.length === 0) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                    setOrderInfo(response);
                    updatePage(response);
                }
            });
        }
        getStatus(docId);

        // Set up interval to refresh every 2 minutes
        const intervalId = setInterval(() => {
            getStatus(docId);
        }, 2 * 60 * 1000); // 2 minutes in milliseconds

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);

    }, [docId]);

    return (
        <>
            {foundBro ? <BroFound delivery={orderInfo} /> : <SearchingForBros delivery={orderInfo} />}
        </>
    );
}
