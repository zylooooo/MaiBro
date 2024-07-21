import "./Settings.css";
import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import BackButton, { ProfileTopBar } from "../common/topTab/topTab.jsx";
import BottomTab from "../common/bottomTab/bottomTab";

// Define the styled component for the settings button
const SettingsButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 30px',
    border: '1px solid',
    lineHeight: 1.5,
    color: '#000000',
    textAlign: 'left', // Corrected typo: 'textalign' to 'textAlign'
    backgroundColor: '#F4F4F4',
    borderColor: '#000000',
    fontFamily: [
        'Poppins', 'sans-serif'
    ],
});

export default function Settings() {
    return (
        <div className="settingsArea">
            <div className="settingsHeader">
                <ProfileTopBar/>
            </div>
            <div className="profile">
                <div className="settingsFieldItem">
                    <h1 className='name'>Stella Ng</h1>
                    <h3 className='socialScore'>Social Score - 100 (insert link to social score page)</h3>
                </div>
                <div className="profilePic">
                    <img src='/src/assets/profile_pic.png' className='profilePicImg' alt='Profile Picture'/>
                </div>
            </div>
            <div className='settingsOptions'>
                <SettingsButton variant="contained">Profile Information</SettingsButton>
                <SettingsButton variant="contained">Help Centre</SettingsButton>
                <SettingsButton variant="contained">Notification Settings</SettingsButton>
                <SettingsButton variant="contained">Chat Settings</SettingsButton>
                <SettingsButton variant="contained">Language</SettingsButton>
                <SettingsButton variant="contained">Favourites</SettingsButton>
            </div>
            <div className='bottomTab'>
                <BottomTab></BottomTab>
            </div>
        </div>
    );
}
