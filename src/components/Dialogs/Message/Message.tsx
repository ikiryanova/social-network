import React from 'react';

import './message.css';

type PropsType = {
  messageItem: string;
};

const Message: React.FC<PropsType> = ({ messageItem }) => {
  return <p className="message">{messageItem}</p>;
};

export default Message;