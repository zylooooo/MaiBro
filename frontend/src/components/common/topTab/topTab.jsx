import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './topTab.css';
import { Button } from '@mui/material';

const BackButton = () => {
    const location = useLocation();
    const pathname = location.pathname || '/';
    const arr = pathname.split('/');
    const currPage = arr[arr.length - 1];
    const parentPath = arr
        .filter((item) => {
            return item !== currPage;
        })
        .join('/');
    return (
        <div className='backDiv'>
            <Link to={parentPath}>{<img style={{height:"30px"}} src='src/assets/back.png'></img>}</Link>
        </div>
    )
    
};

export default BackButton;

export function StandardTopBar(prop) {
    var headerName = prop.headerName
    return (
        <div className='header'>
            {headerName}
        </div>
    )};

export function OrderTopBar() {
    return (
        <div className='orderHeader'>
            <div className='header'>
                Order
            </div>
            <div style={{marginTop:"35px"}}>
            <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.8em",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",lineHeight:"100%"}} >
                    + Custom Order
            </Button>
            </div>
        </div>
    )};

export function ProfileTopBar() {
    const location = useLocation();
    const pathname = location.pathname || '/';
    const arr = pathname.split('/');
    const currPage = arr[arr.length - 1];
    const parentPath = arr
        .filter((item) => {
            return item !== currPage;
        })
        .join('/');
    return (
            <>
            <div className='profileTopBar'>
                <BackButton />
                <img src='src/assets/profile_pic.png' className='profilePicImg'/>
            </div>
            
            </>
        )
    };