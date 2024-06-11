import { React, useState } from 'react'
import data from "../home_test"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function Restaurant(detail) {
    const filteredData = data.filter((el) => {
        // if no input the return the original
        // if (!detail.input) {
        //     return el;
        // }
        // //return the item which contains the user input
        // else {
        //     return el.text.toLowerCase().includes(detail.input)
        // }
        return el.name.toLowerCase().includes(detail.input)
    })
    return (
        
        <div className="restaurant">
            {filteredData.map((item) => (
                <>
                <img 
                    src={`${detail.coverImg}`}
                    className="restaurant-image" 
                />
                <div className="restaurant-stats">
                    <span className='name'>{item.name}</span>
                    <div className='restaurant-info'>
                        <span className='money'><AttachMoneyIcon></AttachMoneyIcon></span>
                        <span className='price'>{item.price} • </span>
                        <span className="desc">{item.description}</span>
                    </div>
                </div>
                </>
            ))}
        </div>
        
    )
}
