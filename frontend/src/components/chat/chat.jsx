import {React, useState} from "react";
import { ProfileTopBar, StandardHeader} from "../common/topTab/topTab";
import BottomTab from "../common/bottomTab/bottomTab";
import {Button,TextField, InputAdornment} from '@mui/material';
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';


export default function Chat() {
    const [chat, setChat] = useState("")
    const handleChatChange = (event) => {
        setChat(event.target.value);
    }
    //Need to check whether the chat is from the buyer or the seller to update bottom bar

    return (
        <>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Chat"/>
        </div>
        {/* Prolly a map function to display all the chats */}
        <div className="chatDiv">
            <div className="chatBox">
            <TextField fullWidth id="outlined-basic" color="grey" variant="outlined" value={chat} onChange={handleChatChange} placeholder="Send Message"
                    InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter", height:"45px"
                    }}} focused/>
            <SendIcon style={{paddingLeft:"20px"}}/>
            </div>
        </div>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </>
    )
}