import './Login.css'
import {Button,TextField } from '@mui/material';
import { React, useState } from 'react';
import { Link} from 'react-router-dom';

function Login() {
  // controlled buttons
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const resetPhone = () => {
    setPhone('');
  }

  const [otp, setOtp] = useState('');
  const handleOtpChange = (event) => {
      setOtp(event.target.value);
  };
  const resetOtp = () => {
      setOtp('');
  }
  return (
    <>
        <div className='logo'>
        <img src='src/assets/icon.png' className='logoImg'/>
        </div>
        <div className='loginArea'>
            <div className='loginHeader'>
                <h1>Login 🔒</h1>
            </div>
            
            <div className='loginField'>
                <TextField fullWidth id="outlined-basic" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} variant="outlined" margin="normal" color="grey" InputProps={{style: {borderRadius: "25px",backgroundColor: '#e1e1e1'}}} focused/>
                <TextField fullWidth id="outlined-basic" placeholder="OTP" value={otp} onChange={handleOtpChange} type="password" variant="outlined" color="grey" InputProps={{style: {borderRadius: "25px",backgroundColor: '#e1e1e1',}}} focused/>
            </div>

            <div className="loginButtonDiv">
                <Button className="loginButton"  disableRipple fullWidth variant='contained' style={{borderRadius: "25px", fontSize:"0.7em",marginBottom:"15px",padding:"12px",backgroundColor:"#C6252E",}}>
                    Login
                </Button>
            </div>
        </div>
        </>
  )
}

export default Login
