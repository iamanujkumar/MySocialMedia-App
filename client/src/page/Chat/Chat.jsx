import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { useSelector } from 'react-redux'
import { userChats } from '../../api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import { Link } from 'react-router-dom'
import {UilSetting} from '@iconscout/react-unicons'
import Noti from '../../img/noti.png'
import Home from '../../img/home.png'
import Comment from '../../img/comment.png'
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from 'socket.io-client'
const Chat = () => {

    const {user} = useSelector((state)=>state.authReducer.authData)
   
    const [chats, setChats] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [sendMessage,setSendMessage] = useState(null)
    const [receiverMessage,setReceiverMessage] = useState(null)

    //send msg socket server
    const socket = useRef()

    useEffect(()=>{
        if(sendMessage!==null){
            socket.current.emit('send-message',sendMessage)
        }
    },[sendMessage])

   

    useEffect(()=>{
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add",user._id)
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users);
         
        })
    },[user])

    useEffect(()=>{
        socket.current.on("receiver-message",(data)=>{
            setReceiverMessage(data)
        })
    },[])

    useEffect(()=>{
        const getChats = async()=>{
            try {
                const {data} = await userChats(user._id)
                setChats(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        getChats();
    },[user._id])

    const checkOnline = (chat)=>{
        const chatMembers = chat.members.find((member)=>member!==user._id)
        const online = onlineUsers.find((user)=>user.userId===chatMembers)
        return online?true:false;
    }

  return (
    <div className="Chat">
        <div className="leftSideChat">
            <LogoSearch/>
            <div className="ChatContainer">
            <h2>Chats</h2>
            <div className="Chat-List">
               {chats.map((chat)=>(
                <div onClick={()=>setCurrentChat(chat)}>
                    <Conversation data={chat} currentUserId={user._id} online={checkOnline(chat)}/>
                </div>
               ))}

               
            </div>
            </div>
            
        </div>
        <div className="rightSideChat">
            <div style={{width:'20rem', alignSelf:'flex-end'}}>
            <div className="navIcons">
        <Link to ="../home"><img src={Home} alt="" /></Link>
        
        <UilSetting/>
        <img src={Noti} alt="" />
        <Link to ="../chat"><img src={Comment} alt="" /></Link>  
      </div>
            </div>

        <ChatBox chat={currentChat} currentUser={user._id} setSendMessage = {setSendMessage} receiverMessage={receiverMessage}/>
        </div>


    </div>
  )
}

export default Chat
