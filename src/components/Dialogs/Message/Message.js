import React from 'react';
import './message.css';

const Message = ({ messageItem }) => {
  return <p className="message">{messageItem}</p>;
};

export default Message;