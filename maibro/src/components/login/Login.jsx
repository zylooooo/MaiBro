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
        <img src='src/assets/icon.png' className='logo'/>
        <div className='loginArea'>
            <div className='loginHeader'>
                <h1 style={{fontSize: 3 + "em"}}>Login 🔒</h1>
            </div>
            
            <div className='loginField'>
                <TextField fullWidth id="outlined-basic" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} variant="outlined" margin="normal" color="grey" InputProps={{style: {borderRadius: "25px",backgroundColor: '#EDEDED'}}} focused/>
                <TextField fullWidth id="outlined-basic" placeholder="OTP" value={otp} onChange={handleOtpChange} type="password" variant="outlined" color="grey" InputProps={{style: {borderRadius: "25px",backgroundColor: '#EDEDED',}}} focused/>
            </div>

            <div className="loginButtonDiv">
                <Button className="loginButton"  disableRipple fullWidth variant='contained' style={{borderRadius: "25px", fontSize:"16px",marginBottom:"15px"}}>
                    Login
                </Button>
                
                <Link to="/signup"><Button disableRipple fullWidth color="secondary" variant='contained' style={{borderRadius: "25px", fontSize:"16px", }}>
                    Sign Up!
                </Button></Link>
                <Link to="/forgotpassword">Forget Password</Link>
            </div>
        </div>
        </>
  )
}

export default Login
