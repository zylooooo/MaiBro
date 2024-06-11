import React from "react"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Restaurant(details) {
    
    return (
        <div className="restaurant">
            <img 
                src={`${details.coverImg}`} 
                className="restaurant-image" 
            />
            <div className="restaurant-stats">
                <AttachMoneyIcon></AttachMoneyIcon>
                <span>{details.price} • </span>
                <span className="desc">{details.description}</span>
            </div>
        </div>
    )
}