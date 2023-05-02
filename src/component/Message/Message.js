import React from "react";
import "./Message.css";

const Message = ({ name, message, classs }) => {
  if (name) {
    return (
      <div className={`messageBox ${classs}`}>{`${name}: ${message}`}</div>
    );
  } else {
    return <div className={`messageBox ${classs}`}>{`${message}`}</div>;
  }
  //   return <div className="messageBox left right">{message}</div>;
};

export default Message;
