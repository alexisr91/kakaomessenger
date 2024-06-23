import React from "react";
import "./Message.css";
import { Avatar } from "@mui/material";
import { useStateValue } from "./StateProvider";

// Composant du message avec info du message, profile pic, nom
function Message({ name, text, timestamp, profilePicSrc, isSender }) {
  return (
    <div className={`message ${isSender && "message_sender"}`}>
      {!isSender && <Avatar src={profilePicSrc} />}
      <div className="message__info">
        <div className="message__name"> {name}</div>
        <div className="message__details">
          <div className="message__text"> {text} </div>
          <div className="message__timestamp">{timestamp}</div>
        </div>
      </div>
    </div>
  );
}

export default Message;
