import './Login.css'
import {Button,TextField, InputAdornment} from '@mui/material';
import {React, useState } from 'react';
import {Link} from 'react-router-dom';


function Login() {
  //States for TextFields
  //Phone Number
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const resetPhone = () => {
    setPhone('');
  }

  //OTP
  const [otp, setOtp] = useState('');
  const handleOtpChange = (event) => {
      setOtp(event.target.value);
  };
  const resetOtp = () => {
      setOtp('');
  }

  //Authenticate OTP
  const [auth, setAuth] = useState(false);
  const getAuth= () => {
    setAuth(true);
    //Insert Function to call and obtain OTP HERE
  }
  return (
    <> 
        <div className='logo'>
        <img src='src/assets/icon.png' className='logoImg'/>
        </div>
        <div className='loginArea'>
            <div className='loginHeader'>
                <h1 className='lato'>Login</h1>
                <Button disableRipple variant='contained' 
                style={{borderRadius: "20px", fontSize:"0.7em",backgroundColor:"#133851",height:"3em",marginRight:"1%",textTransform:"none",fontWeight:"600"}}>
                  Sign Up</Button>
            </div>
            
            <div className='loginField'>
                <TextField fullWidth id="outlined-basic" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} color="grey" variant="outlined"  
                InputProps={{endAdornment:<InputAdornment position="end"><div onClick={{getAuth}}>Get OTP</div></InputAdornment>, style: {borderRadius: "25px",backgroundColor: '#D3D3D3', marginBottom:"7.5px",fontFamily:"Inter",
                }}} focused/>
                <TextField fullWidth id="outlined-basic" placeholder="OTP" value={otp} onChange={handleOtpChange} color="grey" type="password" variant="outlined" 
                InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter"}}} focused/>
            </div>

            <div className="loginButtonDiv">
                <Button disableRipple fullWidth variant='contained' 
                style={{borderRadius: "25px", fontSize:"0.8em",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}} >
                    Login
                </Button>
            </div>
        </div>
        </>
  )
}

export default Login
