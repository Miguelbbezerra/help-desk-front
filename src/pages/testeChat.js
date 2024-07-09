import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// import './App.css';

const socket = io('http://localhost:5000');

function TesteChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ticketId = 4; // Substitua pelo valor real
  const userId = 1; // Substitua pelo valor real

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      const msg = {
        message,
        ticketId,
        userId
      };
      socket.emit('chat message', msg);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <ul id="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
      <form id="message-form" onSubmit={handleSubmit}>
        <input
          id="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default TesteChat;
