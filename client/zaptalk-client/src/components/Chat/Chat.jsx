import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

import InfoBar from "../InfoBar/InfoBar";
import TextContainer from "../TextContainer/TextContainer";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";

import "./Chat.css";

function Chat() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef(); // Persistent socket reference
  const location = useLocation();

  const ENDPOINT = "https://zaptalk-chatapp.onrender.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    if (!name || !room) {
      // Redirect back to join if no name or room
      window.location.href = '/';
      return;
    }

socket.current = io(ENDPOINT, {
  transports: ['polling'],
  timeout: 30000
});
    setName(name);
    setRoom(room);

    socket.current.on('connect', () => {
      setIsConnected(true);
    });

    socket.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.current.emit("join", { name, room }, ({ error }) => {
      if (error) {
        alert(error);
        window.location.href = '/';
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.current.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message.trim()) {
      socket.current.emit("sendMessage", message, () => setMessage(""));
    }
  };

  return (
    <div className="outerContainer">
      {!isConnected && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '18px',
          fontWeight: '500',
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '1rem 2rem',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(10px)'
        }}>
          Connecting to chat...
        </div>
      )}
      <div className="chatLayout">
        <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        <TextContainer users={users} />
      </div>
    </div>
  );
}

export default Chat;
