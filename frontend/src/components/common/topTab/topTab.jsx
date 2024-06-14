import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './topTab.css';
import { Button } from '@mui/material';

const BackButton = () => {
    // const location = useLocation();
    // const pathname = location.pathname || '/';
    // const arr = pathname.split('/');
    // const currPage = arr[arr.length - 1];
    // const parentPath = arr
    //     .filter((item) => {
    //         return item !== currPage;
    //     })
    //     .join('/');

    //On button press, retrieve last component in navigation history/stack
    const navigate = useNavigate();
    const handleBackPress = () => {
        navigate(-1);
    }
    return (
        <div className='backDiv'>
            <img onClick={handleBackPress} style={{height:"1.5em"}} src='/src/assets/back.png'></img>
        </div>
    )
    
};

export default BackButton;

export function StandardHeader(prop) {
    var headerName = prop.headerName
    return (
        <div className='header'>
            {headerName}
        </div>
    )};

export function OrderHeader() {
    return (
        <div className='orderHeader'>
            <div className='header'>
                Order
            </div>
            <div style={{marginTop:"15px"}}>
            <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.8em",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600",lineHeight:"100%"}} >
                    + Custom Order
            </Button>
            </div>
        </div>
    )};

export function ProfileTopBar() {
    return (
            <>
            <div className='profileTopBar'>
                <BackButton />
                <img style={{height:"3em",width:"3em"}}src='/src/assets/profile_pic.png' className='profilePicImg'/>
            </div>
            
            </>
        )
    };

//Same as profile top bar but no back button. Says "HELLO" to user
export function OrderTopBar() {
    return (
            <>
            <div className='profileTopBar'>
                <div style={{paddingLeft:"2.5%", fontWeight:"650", fontSize:"1em"}}>Welcome to MaiBro!</div>
                <img style={{height:"3em",width:"3em"}}src='src/assets/profile_pic.png' className='profilePicImg'/>
            </div>
            
            </>
        )
    };