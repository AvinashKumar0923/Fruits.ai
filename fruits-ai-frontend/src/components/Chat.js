import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';  // External CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar';

const Chat = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    // Append the user's prompt
    const newMessages = [...messages, { type: 'user', text: prompt }];
    setMessages(newMessages);

    try {
      const response = await axios.post('http://localhost:5000/chatbot', { prompt });
      setMessages([...newMessages, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { type: 'bot', text: 'Error: Unable to fetch response' }]);
    }
    setPrompt('');
  };

  const handleDelete = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index && i !== index + 1); // Delete the user's and bot's message together
    setMessages(updatedMessages);
  };

  return (
    <div><Navbar/>
    <div className="chat-container">
      <h2>Chat with Fruits.ai Bot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <span>{msg.text}</span>
            {msg.type === 'bot' && (
              <FontAwesomeIcon
                icon={faTrash}
                className="delete-icon"
                onClick={() => handleDelete(index - 1)}  // Delete both user and bot messages
              />
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Chat;
