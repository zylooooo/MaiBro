import { React, useEffect, useState } from 'react'
import "../home.css"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Home from '../home';
// COMMENT OUT IF USING DATABASE
// import data from "../home_test"
import { useNavigate } from 'react-router-dom';
import { getAllRestaurant, getRestaurantMenu } from '/src/service/axiosService';

export default function Restaurant(detail) {
    // // COMMENT OUT IF USING TEST DATA
    const [data, setData] = useState([]);
    const [lastRestaurantUpdate, setLastRestaurantUpdate] = useState([]);

    useEffect(() => {
        // Function to call backend for opened restaurant list
        async function getRestaurantList() {
            await getAllRestaurant().then((response) => {  
                if (response === undefined) {
                    console.log("No Data");
                    return false;
                } else {
                    setData(response);
                }
            });
        }

        // Get the current hour
        const date = new Date();
        const currentHour = date.getHours();
        //Check if local cache contains restaurant data. If not call backend
        if (localStorage.getItem('restaurantData') == "[]") {
            console.log("No Data in local cache")
            getRestaurantList().then(() => {
                //Save restaurant data to local cache
                localStorage.setItem('restaurantData', JSON.stringify(data));
            });
            
            //Save lastUpdate time to local cache
            localStorage.setItem('lastRestaurantUpdate', currentHour);}
        else {
            console.log("Data in local cache... Checking time now")
            if (localStorage.getItem('lastRestaurantUpdate') != currentHour) {
                console.log("Data in local cache is outdated. Updating now")
                getRestaurantList().then(() => {
                    //Save restaurant data to local cache
                    localStorage.setItem('restaurantData', JSON.stringify(data));
                });

                //Save lastUpdate time to local cache
                localStorage.setItem('lastRestaurantUpdate', currentHour);
            }
            setData(JSON.parse(localStorage.getItem('restaurantData')));
        }
    }, []);
    
    // Filter the data based on the input on the search bar in home.jsx
    const filteredData = data.filter((el) => {
        return el.id.toLowerCase().includes(detail.input)
    })

    // Handle Button Click
    const navigate = useNavigate();
    // Menu State
    const [menu, setMenu] = useState(false);

    async function checkMenuExists(id) {
        const body = {
            restaurantId: id,
        }
        const check = await getRestaurantMenu(body).then((response) => {  
            if (("error" in response)) {
                return false
            } else{
                return true
            }
        });
        return check
    }


    async function restaurantClick(restaurantInfo){
        //Call function to check if restaurant has standard menu
        const check = await checkMenuExists(restaurantInfo.id)

        // Route to menu order page/custom order page depending on return value
        //Check if restaurant requires standard/custom order page (COMMENTED OUT UNTIL ISSUE IS FIXED)
        if (check) {
            // Redirect to standard restaurant order page and pass the restaurant name/id to list the menu (Rn im using name)
            navigate("/home/standardorder", {state: {restaurant: restaurantInfo}});
        } else{
            // Redirect to custom order page and pass the restaurant id to list the menu
            navigate("/home/standardordercustom", {state: {restaurant: restaurantInfo}});
        }
        
        // //Bypass above if/else
        // navigate("/home/standardordercustom", {state: {restaurant: item}});
        
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
