import {Button,TextField, InputAdornment, Container} from '@mui/material';
import {React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {firebaseAuth} from "../../service/firebaseConfig";
import { updateProfile } from 'firebase/auth';
import "./signup.css";


export default function SignUp() {
    //Initialise react router navigate function
    const navigate = useNavigate();

    

    // States for Text Fields
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
      setName(event.target.value);
    };

    // Update Name to userAccount in Firebase
    const updateName = () => {
        // Get User Info from Firebase
        const user = firebaseAuth.currentUser;
        updateProfile(user, {
            //Contents to update
            displayName: name
        }).then(() => {
            // Profile update successful
            console.log("Name updated successfully");
            sessionStorage.setItem("userName", name);
            navigate('/home');
        }).catch((error) => {
            // An error occurred
            console.log(error)
            console.log("An error occurred while updating name");
        });
    };

    return (
        <> 
        <div className='logo'>
        <img src='src/assets/icon.png' className='logoImg'/>
        </div>
        <div className='signupArea'>
            <div className='signupHeader'>
                <h1 className='lato'>Create New Account</h1>
            </div>
            
            <div className='signupField'>
                <TextField fullWidth id="outlined-basic" placeholder="Name" value={name} onChange={handleNameChange} color="grey" variant="outlined" 
                InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter"}}} focused/>
            </div>

            <div className="signupButtonDiv">
                <Button disableRipple fullWidth variant='contained' onClick={updateName}
                style={{borderRadius: "25px", fontSize:"0.8em",marginBottom:"15px",backgroundColor:"#C6252E",height:"3.5em",textTransform:"none",fontWeight:"600"}} >
                    Create Account
                </Button>
            </div>
        </div>
        <div className='recaptcha' id='recaptcha'>

        </div>
        </>
    );
}