import {React, useState, useEffect} from "react";
import { ProfileTopBar, StandardHeader} from "../common/topTab/topTab";
import BottomTab from "../common/bottomTab/bottomTab";
import {Button,TextField, InputAdornment} from '@mui/material';
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";

//Need to check whether the chat is from the buyer or the seller to update bottom bar
const socket = io('http://localhost:3000');
const sender = sessionStorage.getItem("userName");

const ChatDisplay = ({roomId}) => {
    //Server Message
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        // Join the specified room
        socket.emit('join room', roomId);
        
        // Listen for 'chat message' events in the room
        socket.on('chat message', (msg) => {
          console.log(`Message received: ${msg}`);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
    
        // Clean up the socket connection when the component unmounts
        return () => {
          socket.off('chat message');
        };
      }, [socket, roomId]);
      
    return (
        <div id="messages">
            {messages.map((msg, index) => (
            <div key={index} className="messageCard">
                <strong>{msg.sender}:</strong> {msg.message}
            </div>
            ))}
        </div>
    )
}

export default function Chat() {
    const roomId = "testRoom";
    //Client Message
    const [message, setMessage] = useState("")
    const handleChatChange = (event) => {
        setMessage(event.target.value);
    }
    const handleSend = (e) => {
        e.preventDefault();
        socket.emit('chat message', {roomId, message, sender});
        console.log("Message sent: ", message);
        setMessage('');
      };
    
    return (
        <>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="Chat"/>
        </div>
        {/* Prolly a map function to display all the chats */}
        <div className="chatList">
        <ChatDisplay roomId={roomId}/>
        </div>
        <div className="chatDiv">
            <div className="chatBox">
            <TextField fullWidth id="outlined-basic" color="grey" variant="outlined" value={message} onChange={handleChatChange} placeholder="Send Message"
                    InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter", height:"45px"
                    }}} focused/>
            <SendIcon style={{paddingLeft:"20px"}} onClick={handleSend}/>
            </div>
        </div>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </>
    )
}