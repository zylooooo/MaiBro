import { React, useEffect, useState } from 'react'
import { ProfileTopBar, StandardHeader } from '../../common/topTab/topTab'
import BottomTab from '../../common/bottomTab/bottomTab'
import { useLocation } from 'react-router-dom'
import './standardOrder.css'
import {Button, TextField, Divider} from '@mui/material'
import restaurantMenu from './restaurantMenu'
import { getRestaurantMenu } from '/src/service/axiosService';

export default function StandardOrder(){
    //Obtain prop from history
    const location = useLocation();
    const restaurantObj = location.state.restaurant;
    const restaurantName = restaurantObj.id;
    const restaurantLogo = restaurantObj.coverImg;

    //Textfield State
    const [userLocation, setLocation] = useState('');
    const handleLocationChange= (event) => {
        setLocation(event.target.value);
    }
    const [itemQuantity, setQuantity] = useState({})
    const handleQuantityChange = (index, event) => {
        const update = {...itemQuantity}
        //check if event value is 0
        if ((event.target.value === "0") || (event.target.value === "")) {
            delete update[index]
        } else {
            update[index] = event.target.value
        }
        
        setQuantity(update)
    }

    //Obtain menu items list obj
    const [menu, setMenu] = useState([]); 
    useEffect(() => {
        // Function to call backend for opened restaurant list
        async function getMenu() {
            const body = {
                restaurantId: restaurantName,
            }
            await getRestaurantMenu(body).then((response) => {  
                // Update the state of menu
                setMenu(response)
            })
        }
        getMenu();
    }, []);


    return (
        <>
        <div className='fixed'>
        <ProfileTopBar />
        <StandardHeader headerName="Order"/>
        </div>
        <div className='main'>
            <div className="restaurantTitle">
                <img src={restaurantLogo} style={{height:"3em"}}/>
                <div className='restaurantName'>{restaurantName}</div>
            </div>
        
       
        <form>
            <div className='menuDetails'>
                    {
                        //For each item in the menu, display the item name, price and description
                        menu.map((item) => {
                            //Use Item Name as ID
                            const id = item.itemName

                            return (
                                <>
                                <div key={id} >
                                <div className='menuItem'>
                                    <div className='itemInfo'>
                                    <div style={{fontWeight:"bold", fontSize:"1.3em"}}>{id}</div>
                                    <div>${item.price}</div>
                                    </div>
                                    <div ><TextField className='itemQuantity' size="small" color="grey" value={itemQuantity.id} onChange={(event) => handleQuantityChange(id,event)}
                                    InputProps={{style:{marginRight:"5px",backgroundColor:"#d4d4d4",width:"2.8em",height:"2.8em"}}} 
                                    focused/></div>
                                </div>
                                <Divider variant="middle" component="div" style={{margin:"10px"}}/>
                                </div>
                                </>
                            )
                        })
                    }
            </div>
            <div className='userLocation'>
                <TextField fullWidth id="outlined-basic" placeholder="Delivery Location" value={userLocation} onChange={handleLocationChange} color="grey" variant="outlined" 
                    InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter"}}} focused />
                <Button disableRipple fullWidth variant='contained' 
                    style={{borderRadius: "25px", fontSize:"0.8em",marginTop:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                        Confirm Order
                </Button>
            </div> 
        </form>
        </div>
            <BottomTab value="Order" />
        </>
    )
}

export function StandardOrderCustom() {
    const location = useLocation();
    //Obtain prop from history
    
    const restaurantObj = location.state.restaurant;
    const restaurantName = restaurantObj.id;
    const restaurantLogo = restaurantObj.coverImg;

    //Textfield State
    const [userLocation, setLocation] = useState('');
    const handleLocationChange= (event) => {
        setLocation(event.target.value);
    }

    //handle Button press
    //do nothing now
    return (
        <>
        <ProfileTopBar />
        <StandardHeader headerName="Order"/>
        <div className='main'>
            <div className="restaurantTitle">
                <img src={restaurantLogo} style={{height:"3em"}}/>
                <div className='restaurantName'>{restaurantName}</div>
            </div>
            <div className='customOrderDetails'>
            <TextField
            fullWidth placeholder="Input Order Here"
            multiline rows={15} 
            color='grey' variant="outlined"
            InputProps={{style: {borderRadius: "25px", backgroundColor: '#D3D3D3'}}}
            focused
            />
            </div>
            <div className='userLocation'>
                <TextField fullWidth id="outlined-basic" placeholder="Delivery Location" value={userLocation} onChange={handleLocationChange} color="grey" variant="outlined" 
                    InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter"}}} focused />
                <Button disableRipple fullWidth variant='contained' 
                    style={{borderRadius: "25px", fontSize:"0.8em",marginTop:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                        Confirm Order
                </Button>
            </div> 
        </div>
        <BottomTab value="Order" />
        </>
    )
}