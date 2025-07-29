import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  const isAdminMessage = user === 'admin' || user === 'Admin';

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  // Admin/system messages
  if (isAdminMessage) {
    return (
      <div className="messageContainer" style={{ justifyContent: 'center' }}>
        <div className="messageBox admin">
          <p className="messageText">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    );
  }

  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          <p className="sentText pr-10">You</p>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
            </div>
            <p className="sentText pl-10">{user}</p>
          </div>
        )
  );
}

export default Message;