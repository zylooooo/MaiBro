import { React, useState } from 'react'
import data from "../home_test"
import "../home.css"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Restaurant(detail) {
    // Filter the data based on the input on the search bar in home.jsx
    const filteredData = data.filter((el) => {
        return el.name.toLowerCase().includes(detail.input)
    })

    return (
        
        <div className="restaurant">
            {/* return the details of restaurant based on what is in filteredData array */}
            {filteredData.map((item) => {
                
                return (
                    <div className="restaurant-overall">
                        {/* restaurant image */}
                        <img 
                            src={`${item.coverImg}`}
                            className="restaurant-image" 
                        />
                        {/* restaurant name, price and description */}
                        <div className="restaurant-stats">
                            <span className='name'>{item.name}</span>
                            <div className='restaurant-info'>
                                <span className='money'><AttachMoneyIcon></AttachMoneyIcon></span>
                                <span className='price'>{item.price} • </span>
                                <span className="desc">{item.description}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
    )
}
