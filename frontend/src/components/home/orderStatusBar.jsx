import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"

export default function OrderStatus() {
    const navigate = useNavigate();
    //LOGIC to obtain accepted orders from backend
    const [isVisible, setIsVisible] = useState(true);
    const [status, setStatus] = useState("Finding Bros...")

    // Serach for order and check for status


    //On Status Bar Click
    const handleClick = () => {
        console.log("CLICKED")
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