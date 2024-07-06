import { React, useEffect, useState } from 'react'
import "../home.css"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Home from '../home';
// COMMENT OUT IF USING DATABASE
import data from "../home_test"
import { useNavigate } from 'react-router-dom';
import { getAllRestaurant } from '/src/service/axiosService';

export default function Restaurant(detail) {
    // // COMMENT OUT IF USING TEST DATA
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     // Function to call backend for opened restaurant list
    //     async function getRestaurantList() {
    //         await getAllRestaurant().then((response) => {  
    //             if (response === undefined) {
    //                 console.log("No Data");
    //                 return false;
    //             } else {
    //                 setData(response);
    //             }
    //         });
    //     }
    //     getRestaurantList();
    // }, []);
    
    // Filter the data based on the input on the search bar in home.jsx
    const filteredData = data.filter((el) => {
        return el.id.toLowerCase().includes(detail.input)
    })

    // Handle Routing from button click
    const navigate = useNavigate();
    function restaurantClick(item){
        //Check if restaurant requires standard/custom order page
        if (item.custom) {
            // Redirect to custom order page and pass the restaurant id to list the menu
            navigate("/home/standardordercustom", {state: {restaurant: item}});
        } else{
            // Redirect to standard restaurant order page and pass the restaurant name/id to list the menu (Rn im using name)
            navigate("/home/standardorder", {state: {restaurant: item}});
        }
        
    }

    return (
        <div className="restaurant">
            {/* return the details of restaurant based on what is in filteredData array */}
            {filteredData.map((item) => {
                // Check if restaurant is open
                // draw out the current time 
                // get database info (lowercase day TO PASS TO backend, frontend will obtain object saying openTime, closeTime)
                // check if restuarant is open
                // if else statement
                return (
                    <div className="restaurant-overall" key={item.id} onClick={()=>restaurantClick(item)} >
                        {/* restaurant image */}
                        <img 
                            src={`${item.coverImg}`}
                            className="restaurant-image" 
                        />
                        {/* restaurant name, price and description */}
                        <div className="restaurant-stats">
                            <span className='name' style={{fontSize:"1.3em"}}>{item.id}</span>
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
