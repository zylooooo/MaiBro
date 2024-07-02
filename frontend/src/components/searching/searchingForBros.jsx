import React from "react";
import "./searchingForBros.css";
import "../common/topTab/topTab.css";
import {Button,TextField, InputAdornment} from '@mui/material';
import BottomTab from "../common/bottomTab/bottomTab";
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import Searching from './images/Searching.png'

export default function SearchingForBros() {

    let name = localStorage.getItem('name')
    let address = localStorage.getItem('address')
    let delivery = localStorage.getItem('delivery')
    let order = localStorage.getItem('order')

    return (
        <div className="searchingForBros">
            <div className="searchingForBrosHeader">
                <h2 className="searchingForBrosTitle">Searching...</h2>
                <img src={Searching} className='pic_time' alt=''></img>
            </div>
            <div className="searchingForBrosBody">
                <div className="searchingForBrosBodyText">
                    <h1 className="searchingForBrosBodyTitle">Your Order</h1>
                    <div className='confirmation'>
                        <div className='confirmation-location'>
                        <RoomServiceOutlinedIcon></RoomServiceOutlinedIcon>
                        <div className='confirmation-title'>{name}</div>
                        </div>
                        <div className='confirmationText'>{address}</div>
                        <div className='delivery-location'>
                        <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
                        <div className='delivery-title'>Delivery Location</div>
                        </div>
                        <div className='delivery-place'>{delivery}</div>
                        <div className='order'>
                        <ArticleOutlinedIcon></ArticleOutlinedIcon> 
                        <div className='order-details'>Order Details</div>
                        </div>
                        <div className='order-list'>{order}</div>

                        <Button disableRipple fullWidth variant='contained' className='confirm-button'
                        style={{borderRadius: "25px", fontSize:"0.8em",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}}
                        onClick={""}>
                        Cancel Order
                        </Button>
                    </div>
                </div>
            </div>
            <div>
                <BottomTab />
            </div>
        </div>
    );
}