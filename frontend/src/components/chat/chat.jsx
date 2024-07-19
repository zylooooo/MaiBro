import {React, useState, useEffect, useRef, useLayoutEffect} from "react";
import { ProfileTopBar, StandardHeader} from "../common/topTab/topTab";
import BottomTab from "../common/bottomTab/bottomTab";
import {Button,TextField, InputAdornment} from '@mui/material';
import "./chat.css";
import SendIcon from '@mui/icons-material/Send';
import {io} from "socket.io-client";
import {useLocation} from "react-router-dom";
import { createChatRoom, getAllMessages, sendNotification } from "../../service/axiosService";

//Need to check whether the chat is from the buyer or the seller to update bottom bar



const ChatDisplay = ({roomId}) => {
    //Server Message (Replace useState with current chat history obtained from mongoDB)
    const [messages, setMessages] = useState([]);
    const sender = sessionStorage.getItem("userName");
    const socket = io('http://localhost:8000');

    const messagesEndRef = useRef(null);

    // Create/Check mongoDB for messages
    useEffect(() => {
        // Check if mongoDB has create chat room by passing in roomId, else create chat room
        async function createRoom() {
            const body = {
                roomId: roomId,
            };
            await createChatRoom(body).then((res) => {
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

    const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useLayoutEffect(() => {
    scrollToBottom();
    }, [messages]);
      
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
            <div ref={messagesEndRef} />
        </div>
    )
}

export default function Chat() {
    const location = useLocation();
    const deliveryObj = location.state.delivery;
    const sender = sessionStorage.getItem("userName");
    const socket = io('http://localhost:8000');
    
    //Get the roomId(OrderId) and opposite sender name
    const roomId = deliveryObj.docId;
    const otherName = (deliveryObj.broId === sender) ? deliveryObj.buyerId : deliveryObj.broId;

    //Client Message
    const messageRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const message = messageRef.current.value;
        console.log("Sender", sender)
        console.log("Message sent: ", message);
        socket.emit('chat message', {roomId, message, sender});
        // Send Notification to the other user
        messageRef.current.value = ''; // Clear the input field
        await sendNotification({userName: otherName, msg: message});
      };

    const handleSend = (event) => {
    event.preventDefault(); // Prevent default behavior of button click
    handleSubmit(event);
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
        <form onSubmit={handleSubmit}>
            <div className="chatDiv">
                <div className="chatBox">
                <TextField fullWidth id="outlined-basic" color="grey" variant="outlined" inputRef={messageRef} placeholder="Send Message"
                        InputProps={{style: {borderRadius: "25px",backgroundColor: '#D3D3D3',fontFamily:"Inter", height:"45px"
                        }}} focused/>
                <button type="submit" style={{background:"transparent", border:"0px"}} onClick={handleSend}>
                <SendIcon style={{paddingLeft:"20px"}}/>
                </button>
                </div>
            </div>
        </form>
        <div>
            <BottomTab value="Delivery"></BottomTab>
        </div>
        </>
    )
}