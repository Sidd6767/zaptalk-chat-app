import React from 'react';

import './Input.css';

const Input = ({ setMessage, sendMessage, message }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage(event);
    }
  };

  return (
    <form className="form" onSubmit={sendMessage}>
      <input
        className="input"
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={handleKeyPress}
        autoComplete="off"
        maxLength={500}
      />
      <button 
        className="sendButton" 
        type="submit"
        disabled={!message.trim()}
      >
        <span>Send</span>
      </button>
    </form>
  );
};

export default Input;