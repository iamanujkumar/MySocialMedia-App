import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import { getUser } from '../../api/UserRequest';
import './UserProfile.css';
import PostSide from '../../components/profileSide/PostSide/PostSide';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/userAction';
import UserInfoCard from '../../components/UserInfoCard/UserInfoCard';
import LogoSearch from '../../components/LogoSearch/LogoSearch';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import UserChatBox from '../../components/UserChatBox/UserChatBox';
import { createChat, userChats } from '../../api/ChatRequest';

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [sendMessage, setSendMessage] = useState(null);
  const [receiverMessage, setReceiverMessage] = useState(null);
  const [showChatBox, setShowChatBox] = useState(false);
  const [currentChat,setCurrentChat] = useState(null)
  const [chatData,setChatData] =useState(null);

  const socket = useRef();

  useEffect(() => {
    // Initialize the socket connection
    socket.current = io('http://localhost:8800');

    // Emit an event to identify the user
    socket.current.emit('new-user-add', user._id);

    // Add event listeners for chat messages
    socket.current.on('receiver-message', (data) => {
      setReceiverMessage(data);
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, [user]);


  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(id);
        setUserData(response.data);

        // Check if userData is not null before accessing followers
        if (userData && user) {
          setFollowing(userData.followers.includes(user._id));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id, user, userData]);

  const [following, setFollowing] = useState(false);

  const handleFollow = () => {
    // Check if userData is not null before toggling following state
    if (userData) {
      following ? dispatch(unFollowUser(id, user)) : dispatch(followUser(id, user));
      setFollowing((prev) => !prev);
    }
  };


useEffect(() => {
  const getChats = async () => {
    try {
      const { data } = await userChats(user._id);
      setChatData(data);
    } catch (error) {
      console.log(error);
    }
  };
  getChats();
}, [user._id]);

const findChat = (chats, userId) => {
  return chats.find((chat) =>
    chat.members.includes(id) && chat.members.includes(userId)
  );
};


const handleCreateChat = async () => {

  const existingChat = findChat(chatData, id);

    if (existingChat) {
      // Access the existing chat
      setCurrentChat(existingChat._id);
    }
    else{

      try {
        const response = await createChat({ senderId: user._id, receiverId: id });
        setCurrentChat(response.data._id);
      } catch (error) {
        console.error(error);
      }
}
 setShowChatBox(true)


};

  return (
    <div className="UserProfile">
      <div className="userLeft">
        <LogoSearch />
        {userData ? <UserCard userData={userData} location="ProfilePage" /> : <p>Loading user data...</p>}
        {id!==user._id?<div className="btn">
          <button
            className={following ? 'button fc-button UnfollowButton' : 'button fc-button'}
            onClick={handleFollow}
            style={{ width: '45%' }}
          >
            {following ? 'Unfollow' : 'Follow'}
          </button>

          <button
            className="button fc-button"
            style={{ width: '45%' }}
            onClick={handleCreateChat}
          >
            Chat
          </button>
        </div>:" "}
        <UserInfoCard userData={userData} />
      </div>

      <div className="userProfileCenter">
        <PostSide location="UseProfile" />
      </div>

      <div className="rightSide">
        <div className="navIcons">
          <Link to="../home">
            <img src={Home} alt="" />
          </Link>
          <UilSetting />
          <img src={Noti} alt="" />
          <Link to="../chat">
            <img src={Comment} alt="" />
          </Link>
        </div>
        {/* <span>{user._id}</span> */}

        {showChatBox && (
          <UserChatBox
          userData={userData}
          chat={chatData.find((chat) => chat.members.includes(id))}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receiverMessage={receiverMessage}
          currentChat={currentChat}
          />
        )}


      </div>

      
    </div>
  );
};

export default UserProfile;
