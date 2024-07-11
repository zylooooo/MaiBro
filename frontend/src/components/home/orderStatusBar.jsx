import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"
import { buyerOrderStatus } from "../../service/axiosService";

export default function OrderStatus() {
    const userName = sessionStorage.getItem("userName");
    const navigate = useNavigate();
    //LOGIC to obtain accepted orders from backend
    const [isVisible, setIsVisible] = useState(false);
    const [orderStatus, setOrderStatus] = useState([]);
    const [status, setStatus] = useState("Finding Bros...")

    // Serach for order and check for status
    useEffect(() => {
        async function getStatus(userName) {
            const body = {
                userName: userName
            }
            await buyerOrderStatus(body).then((response) => { 
                if (response.length === 0) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                    setOrderStatus(response);
                }
            });
        }
        getStatus(userName);
    },[])

    //On Status Bar Click
    const handleClick = () => {
        console.log("CLICKED")
        //navigate to bro page and pass the order status data to the page via location state.
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