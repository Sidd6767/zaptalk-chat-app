import React from 'react';

import './InfoBar.css';

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <div className="onlineIndicator"></div>
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/" className="closeButton">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </a>
    </div>
  </div>
);

export default InfoBar;