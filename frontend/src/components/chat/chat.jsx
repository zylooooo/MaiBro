import {React, useState, useEffect} from "react";
import { ProfileTopBar, StandardHeader} from "../common/topTab/topTab";
import BottomTab from "../common/bottomTab/bottomTab";
import {Button,TextField, InputAdornment} from '@mui/material';
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import {useLocation} from "react-router-dom";
import { createChatRoom, getAllMessages, sendNotification } from "../../service/axiosService";

//Need to check whether the chat is from the buyer or the seller to update bottom bar
const socket = io('http://localhost:8000');
const sender = sessionStorage.getItem("userName");

const ChatDisplay = ({roomId}) => {
    //Server Message (Replace useState with current chat history obtained from mongoDB)
    const [messages, setMessages] = useState([]);

    // Create/Check mongoDB for messages
    useEffect(() => {
        // Check if mongoDB has create chat room by passing in roomId, else create chat room
        async function createRoom() {
            const body = {
                roomId: roomId,
            };
            await createChatRoom(body).then((res) => {
                console.log("DONE")
            })
        }
        createRoom();

        //Get chat history from mongoDB
        async function getMessages() {
            const body = {
                roomId: roomId,
            };
            await getAllMessages(body).then((res) => {
                setMessages(res.messages)
            })
        }
        getMessages();
    }, []);

    // Socket.io connection
    useEffect(() => {
        // Join the specified room
        socket.emit('join room', roomId);
        
        // Listen for 'chat message' events in the room
        socket.on('chat message', (msg) => {
            const { message, sender } = msg;
            const body ={
                _id: sender,
                roomId: roomId,
                message: message,
            }
            setMessages((prevMessages) => [...prevMessages, body]);
            console.log("Messages: ", messages);
        });
        
        // Clean up the socket connection when the component unmounts
        return () => {
          socket.off('chat message');
        };
      }, [socket, roomId]);
      
    return (
        <div id="messages">
            {messages.map((msg, index) => {
                if (msg._id === sender) {
                    return (
                        <div key={index} className="messageCard sending">
                        <strong>You: </strong> {msg.message}
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className="messageCard receiving">
                        <strong>{msg._id}: </strong> {msg.message}
                        </div>
                    )
                }
            }
            )}
        </div>
    )
}

export default function Chat() {
    const location = useLocation();
    const deliveryObj = location.state.delivery;
    
    //Get the roomId(OrderId) and opposite sender name
    const roomId = deliveryObj.docId;
    const otherName = (deliveryObj.broId === sender) ? deliveryObj.buyerId : deliveryObj.broId;

    //Client Message
    const [message, setMessage] = useState("")
    const handleChatChange = (event) => {
        setMessage(event.target.value);
    }
    const handleSend = async (e) => {
        e.preventDefault();
        // Send Notification to the other user
        // await sendNotification({userName: otherName, msg: message});
        socket.emit('chat message', {roomId, message, sender});
        console.log("Message sent: ", message);
        setMessage('');
      };
    
    return (
        <>
        <div>
            <ProfileTopBar/>
            <StandardHeader headerName="BroChat"/>
        </div>
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