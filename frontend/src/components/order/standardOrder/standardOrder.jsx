import { React, useState } from 'react'
import { ProfileTopBar, StandardHeader } from '../../common/topTab/topTab'
import { BottomNavigation } from '@mui/material'
import BottomTab from '../../common/bottomTab/bottomTab'
import { useLocation } from 'react-router-dom'
import './standardOrder.css'

export default function StandardOrder(){
    const location = useLocation();
    //Obtain prop from history
    const restaurantObj = location.state.restaurant;

    const restaurantName = restaurantObj.name;
    const restaurantLogo = restaurantObj.coverImg;
    return (
        <>
        <ProfileTopBar />
        <StandardHeader headerName="Order"/>
        <div className='main'>
            <div className="restaurantTitle">
                <img src={{restaurantLogo}}></img>
                {restaurantName}
            </div>
            
        </div>
        <BottomTab value="Order"/>
        </>
    )
}