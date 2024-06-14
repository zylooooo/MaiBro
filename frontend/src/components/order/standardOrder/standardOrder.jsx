import { React, useState } from 'react'
import { ProfileTopBar, StandardHeader } from '../../common/topTab/topTab'
import { BottomNavigation } from '@mui/material'
import BottomTab from '../../common/bottomTab/bottomTab'
import { useLocation } from 'react-router-dom'
import './standardOrder.css'
import {Button, TextField} from '@mui/material'
import restaurantMenu from './restaurantMenu'

export default function StandardOrder(){
    const location = useLocation();
    //Obtain prop from history
    const restaurantObj = location.state.restaurant;

    const restaurantName = restaurantObj.name;
    const restaurantLogo = restaurantObj.coverImg;


    const [userLocation, setLocation] = useState('');
    const handleLocationChange= (event) => {
        setLocation(event.target.value);
      }

    //Obtain menu items list obj
    var menuObjList = restaurantMenu[restaurantName]

    return (
        <>
        <div className='fixed'>
        <ProfileTopBar />
        <StandardHeader headerName="Order"/>
        <div className='main'>
            <div className="restaurantTitle">
                <img src={restaurantLogo} style={{height:"3em"}}/>
                <div className='restaurantName'>{restaurantName}</div>
            </div>
        </div>
        </div>
        <div className='menuDetails'>
                {
                    //For each item in the menu, display the item name, price and description
                    menuObjList.map((item) => {
                        return (
                            <div className='menuItem' id={item.id}>
                                <div className='itemName' style={{fontWeight:"bold", fontSize:"1.3em"}}>{item.name}</div>
                                <div className='itemPrice'>${item.price}</div>
                                <div className='itemDescription'>{item.description}</div>
                            </div>
                        )
                    })
                }
        </div>
        <div className='userLocation'>
            <TextField fullWidth id="outlined-basic" placeholder="Delivery Location" value={userLocation} onChange={handleLocationChange} color="grey" variant="outlined" 
                InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter"}}} focused/>
            <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.8em",marginTop:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}} >
                    Confirm Order
            </Button>
        </div> 
            <BottomTab value="Order" />
        </>
    )
}