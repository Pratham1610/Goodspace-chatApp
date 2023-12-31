import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
    setSocket(newSocket);
    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const connectDisconnect = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    } else {
      const newSocket = io('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
      setSocket(newSocket);

      newSocket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit('message', messageInput);
      setMessages((prevMessages) => [...prevMessages, { text: messageInput, sender: 'You' }]);
      setMessageInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior of the "Enter" key in a textarea
      sendMessage();
    }
  };

  return (
    <div className="w-96 h-72 bg-yellow bg-opacity-20 backdrop-blur rounded-md shadow-md">
      <div style={{ overflowY: 'scroll', height: '100%' }}>
        {messages.map((msg, index) => (
          <div key={index} className="text-white">
            {`${msg.sender}: ${msg.text}`}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={connectDisconnect}>
          {socket ? 'Disconnect' : 'Connect'}
        </button>
      </div>
    </div>
  );
};

export default Chatbox;