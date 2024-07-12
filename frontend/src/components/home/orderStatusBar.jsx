import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"
import { buyerOrderStatus } from "../../service/axiosService";

export default function OrderStatus() {
    const userName = sessionStorage.getItem("userName");
    const navigate = useNavigate();
    //LOGIC to obtain accepted orders from backend
    const [isVisible, setIsVisible] = useState(false);
    const [orderInfo, setOrderInfo] = useState([]);
    const [status, setStatus] = useState("Finding Bros...")

    // Serach for order and check for status
    useEffect(() => {
        // Check order status
        function statusCheck(orderInfo) {
            if (orderInfo.orderAccepted === false) {
                setStatus("Finding Bros...")
            }
            if (orderInfo.orderAccepted === true) {
                setStatus("Collecting Food...")
            }
            if (orderInfo.orderCollected === true) {
                setStatus("Delivering Food...")
            }
        }

        async function getStatus(userName) {
            const body = {
                userName: userName
            }
            await buyerOrderStatus(body).then((response) => { 
                if (response.length === 0) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                    setOrderInfo(response[0]);
                    statusCheck(response[0])
                }
            });
        }
        getStatus(userName);
    },[])

    //On Status Bar Click
    const handleClick = () => {
        //navigate to bro page and pass the order status data to the page via location state.
        navigate("/home/info", {state: {order: orderInfo}});
    }
    
    return (
        <>
        <div className={`statusBarDiv ${isVisible ? 'visible' : ''}`} onClick={handleClick} >
            <div className="orderStatus">
                <div>Order Status</div>
                <div style={{fontSize:"12px"}}>{status}</div>
            </div>

        </div>
        </>
    )
}