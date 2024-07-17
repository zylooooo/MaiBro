import './Login.css'
import {Button,TextField, InputAdornment, Container} from '@mui/material';
import {React, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, setPersistence, browserSessionPersistence} from "firebase/auth";
import {firebaseAuth} from "../../service/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import { requestNotificationPermissionAndGetToken } from '../../utils/firebaseMessaging';
import { submitLogin } from '../../service/axiosService';

async function checkToken(userId, token) {
  const body = {
    token: token,
    userId: userId,
  }
  // Call Backend
  await submitLogin(body)

}


function Login() {
  //Initialise react router navigate function
  const navigate = useNavigate();

  

  //States for TextFields
  //Phone Number Text Field
  const [phone, setPhone] = useState('');
  const handlePhoneChange = (event) => {
    // Check if input is a number
    if (event.target.value === '' || /^[0-9\b]+$/.test(event.target.value)){
      setPhone(event.target.value);
  }
  };

  //OTP Text Field
  const [otp, setOtp] = useState('');
  const handleOtpChange = (event) => {
    // Check if input is a number
    if (event.target.value === '' || /^[0-9\b]+$/.test(event.target.value)){
      setOtp(event.target.value);
  }
      ;
  };
  const resetOtp = () => {
      setOtp('');
  }

  //Get OTP Button
  const [auth, setAuth] = useState(false);
  const getAuth = () => {
    //Insert Function to call and obtain OTP HERE
    sendOtp(phone);
  }

  // Get OTP Function
  const sendOtp = async (phoneNumber) => {
    // Initialise invisible reCaptcha for Firebase Phone Auth if not already initialised
    if (!window.reCaptcha) {
      window.reCaptcha = new RecaptchaVerifier(firebaseAuth, 'recaptcha', {
        'size': 'invisible',
        });
    }
    
    // Add country code to phone number
    phoneNumber = "+65" + phoneNumber;

    // Send OTP and allow session persistence login only
    setPersistence(firebaseAuth, browserSessionPersistence)
        .then(() => {
        return signInWithPhoneNumber(firebaseAuth, phoneNumber, window.reCaptcha)})
        .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult
        window.confirmationResult = confirmationResult;
        alert("OTP sent successfully. Please check your phone for the OTP.");
        }).catch(() => {
        // Reset reCaptcha
        grecaptcha.reset(window.recaptchaWidgetId);
        // Error. SMS not sent
        alert("Error: SMS not sent. Please check your phone number and try again.");
        });
  }

  //Sign In Function
  const signIn = async () => {
      const token = await requestNotificationPermissionAndGetToken();

      //Check if OTP is valid
      window.confirmationResult.confirm(otp).then((result) => {
        // User signed in successfully. Obtain object with user information
        const user = result.user;
        alert("Login Successful")

        //Store user tokenID in session for future use
        const idToken = user.accessToken;
        sessionStorage.setItem('idToken', idToken);

        //Navigate to the appropriate page
        const userName = user.displayName;
        sessionStorage.setItem('userName', userName);
        
        //If display name is null, navigate to signup page
        if (userName === null){
          //Navigate to signup page
          navigate('/signup'); 
        } else {
          //Check and refresh token
          checkToken(userName, token);
          //Navigate to home page
          navigate('/home');
          
        }

    }).catch((error) => {
        // User couldn't sign in (bad verification code)
        console.log(error)
        alert("Wrong OTP Received. Please try again.")
        resetOtp();
    });
  }

  return (
    <> 
        <div className='logo'>
        <img src='src/assets/icon.png' className='logoImg'/>
        </div>
        <div className='loginArea'>
            <div className='loginHeader'>
                <h1 className='lato'>Login / Sign Up</h1>
            </div>
            
            <div className='loginField'>
                <TextField fullWidth id="outlined-basic" placeholder="Phone Number" value={phone} onChange={handlePhoneChange} color="grey" variant="outlined"  
                InputProps={{startAdornment:<InputAdornment position='start'>+65</InputAdornment>,endAdornment:<InputAdornment position="end"><div onClick={getAuth}>Get OTP</div></InputAdornment>, style: {borderRadius: "25px",backgroundColor: '#D3D3D3', marginBottom:"7.5px",fontFamily:"Inter",
                }}} focused/>
                <TextField fullWidth id="outlined-basic" placeholder="OTP" value={otp} onChange={handleOtpChange} color="grey" type="password" variant="outlined" 
                InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter"}}} focused/>
            </div>

            <div className="loginButtonDiv">
                <Button disableRipple fullWidth variant='contained' onClick={signIn}
                style={{borderRadius: "25px", fontSize:"0.8em",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}} >
                    Login/Sign Up
                </Button>
            </div>
        </div>
        <div className='recaptcha' id='recaptcha'>

        </div>
        </>
  )
}

export default Login
