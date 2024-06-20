import { React, useState } from 'react'
import { ProfileTopBar, StandardHeader } from '../../common/topTab/topTab'
import BottomTab from '../../common/bottomTab/bottomTab'
import { useLocation } from 'react-router-dom'
import './standardOrder.css'
import {Button, TextField, Divider} from '@mui/material'
import restaurantMenu from './restaurantMenu'

export default function StandardOrder(){
    const location = useLocation();
    //Obtain prop from history
    const restaurantObj = location.state.restaurant;

    const restaurantName = restaurantObj.name;
    const restaurantLogo = restaurantObj.coverImg;

    //Textfield State
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
        </div>
        <div className='main'>
            <div className="restaurantTitle">
                <img src={restaurantLogo} style={{height:"3em"}}/>
                <div className='restaurantName'>{restaurantName}</div>
            </div>
        
       
        <form onSubmit={{}}>
            <div className='menuDetails'>
                    {
                        //For each item in the menu, display the item name, price and description
                        menuObjList.map((item) => {
                            const [quantity, setQuantity] = useState('');
                            const handleQuantityChange= (event) => {
                                const newValue = event.target.value;
                                if (newValue === '' || /^[0-9\b]+$/.test(newValue)){
                                    setQuantity(newValue);
                                }
                                
                              }
                            return (
                                <>
                                <div className='menuItem' key={item.id}>
                                    <div className='itemInfo'>
                                    <div style={{fontWeight:"bold", fontSize:"1.3em"}}>{item.name}</div>
                                    <div>${item.price}</div>
                                    </div>
                                    <div ><TextField className='itemQuantity' size="small" color="grey" value={quantity} onChange={handleQuantityChange}
                                    InputProps={{style:{marginRight:"5px",backgroundColor:"#d4d4d4",width:"2.8em",height:"2.8em"}}} 
                                    focused/></div>
                                </div>
                                <Divider variant="middle" component="div" style={{margin:"10px"}}/>
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

    const restaurantName = restaurantObj.name;
    const restaurantLogo = restaurantObj.coverImg;


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
            multiline rows={15} maxRows={Infinity}
            color='grey' variant="outlined"
            InputProps={{style: {borderRadius: "25px", backgroundColor: '#D3D3D3'}}}
            focused
            />
            </div>
            <div className='confirmOrder'>
            <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",}}
                onClick={{}}>
            Confirm Order</Button>
            </div>
        </div>
        
        <BottomTab value="Order" />
        </>
    )
}