import React, {useState} from "react";
import {Link} from "react-router-dom";

import "./Join.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!room.trim()) {
      newErrors.room = "Room is required";
    } else if (room.trim().length < 2) {
      newErrors.room = "Room must be at least 2 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">ZapTalk</h1>
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-secondary)', 
          marginBottom: '2rem',
          fontSize: '1rem'
        }}>
          Connect instantly with friends and colleagues
        </p>
        
        <div>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors(prev => ({...prev, name: null}));
            }}
            className={`joinInput ${errors.name ? 'error' : ''}`}
            autoComplete="name"
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        
        <div>
          <input 
            type="text" 
            placeholder="Enter room name" 
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
              if (errors.room) setErrors(prev => ({...prev, room: null}));
            }}
            className={`joinInput ${errors.room ? 'error' : ''}`}
            autoComplete="off"
          />
          {errors.room && <div className="error-message">{errors.room}</div>}
        </div>
        
        <Link 
          onClick={(e) => {
            if (!validateForm()) {
              e.preventDefault();
            }
          }} 
          to={`/chat?name=${name.trim()}&room=${room.trim()}`}
        >
          <button className="button mt-20" type="submit">
            Join Chat Room
          </button>
        </Link>
        
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-light)', 
          marginTop: '1.5rem',
          fontSize: '0.875rem'
        }}>
          Create or join existing rooms instantly
        </p>
      </div>
    </div>
  );
}

export default Join;
