import React from "react";
import "./broFound.css";
import "../common/topTab/topTab.css";
import {Button,TextField, InputAdornment} from '@mui/material';
import BottomTab from "../common/bottomTab/bottomTab";
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Purchasing from './images/Purchasing.png'

export default function BroFound(){

    let name = localStorage.getItem('name')
    let delivery = localStorage.getItem('delivery')
    let order = localStorage.getItem('order')

    return(
        <div className="searchingForBros">
            <div className="searchingForBrosHeader">
                <h2 className="searchingForBrosTitle">Purchasing Your Food...</h2>
                <img src={Purchasing} className='pic_time' alt=''></img>
            </div>
            <div className='broContact'>
                <div className='broContactTitle'>Bro's Contact</div>
                <div className='contact-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#143851",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={""}>
                    Chat
                    </Button>
                </div>
            </div>
            <div className="searchingForBrosBody">
                <div className="searchingForBrosBodyText">
                    <h2 className="searchingForBrosBodyTitle">Your Order</h2>
                    <div className='confirmation'>
                        <div className='confirmation-location'>
                        <div className='confirmation-title'><h3>{name}</h3></div>
                        </div>
                        <div className='delivery-location'>
                        <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
                        <div className='delivery-place'>{delivery}</div>
                        </div>
                        <div className='order'>
                        <ArticleOutlinedIcon></ArticleOutlinedIcon>
                        <div className='order-list'>{order}</div>
                        </div>
                        
                    </div>
                </div>
                <div className='cancel-button'>
                    <Button disableRipple fullWidth variant='contained' className='confirm-button'
                    style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"1000"}}
                    onClick={""}>
                    Complete Order
                    </Button>
                </div>
            </div>
            <div>
                <BottomTab />
            </div>
        </div>
    )
}