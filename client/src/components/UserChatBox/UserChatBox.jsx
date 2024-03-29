import React, { useEffect, useState, useRef } from 'react';
import { getMessages, addMessage } from '../../api/MessageRequest';
import { format } from 'timeago.js';
import InputEmoji from 'react-input-emoji';

const UserChatBox = ({ userData, chat, currentUser, setSendMessage, receiverMessage, currentChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(currentChat);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentChat) fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: currentChat,
    };

    const receiverId = userData._id;
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage('');
    } catch {
      console.log('error');
    }
  };

  useEffect(() => {
    if (receiverMessage !== null && receiverMessage.chatId === currentChat) {
      setMessages([...messages, receiverMessage]);
    }
  }, [receiverMessage, currentChat]);

  const scroll = useRef();
  const imageRef = useRef();

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                
                <img
                  src={
                    userData?.profilePicture
                      ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                      : process.env.REACT_APP_PUBLIC_FOLDER + 'defaultProfile.png'
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: '50px', height: '50px' }}
                />
                <div className="name" style={{ fontSize: '0.9rem' }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: '95%',
                border: '0.1px solid #ececec',
                marginTop: '20px',
              }}
            />
          </div>
          <div className="chat-body">
            {messages.map((message) => (
              <div
                ref={scroll}
                className={message.senderId === currentUser ? 'message own' : 'message'}
                key={message._id}
              >
                <span>{message.text}</span>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
            <input type="file" name="" id="" style={{ display: 'none' }} ref={imageRef} />
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start a conversation...
        </span>
      )}
    </div>
  );
};

export default UserChatBox;