import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import {
  faArrowLeft,
  faBars,
  faMicrophone,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare, faGrin } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateBubble from "./DateBubble";
import Message from "./Message";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { useParams } from "react-router-dom";

function Chat() {
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Adam",
      text: "Wassup ?",
      timestamp: "11:40",
      profilePicSrc: `https://api.dicebear.com/7.x/shapes/svg`,
    },
    {
      name: "Jenny",
      text: "Just chilling",
      timestamp: "11:50",
      profilePicSrc: `https://api.dicebear.com/7.x/personas/svg?seed=Boots`,
    },
    {
      name: "Bill",
      text: "Wow cool",
      timestamp: "11:55",
      profilePicSrc: `https://api.dicebear.com/7.x/avataaars-neutral/svg`,
      isSender: true,
    },
    {
      name: "Adam",
      text: "Good for you ",
      timestamp: "12:40",
      profilePicSrc: `https://api.dicebear.com/7.x/shapes/svg`,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const message = {
      text: inputRef.current.value,
      name: "Bill",
      profilePicSrc: `https://api.dicebear.com/7.x/avataaars-neutral/svg`,
      timestamp: "11:55",
    };

    setMessages((currentMessages) => [...currentMessages, message]);
    inputRef.current.value = "";
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <IconButton>
          <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton>

        <div className="chat__headerInfo">
          <h3>Kakao room</h3>
        </div>

        <IconButton>
          <FontAwesomeIcon icon={faSearch} />
        </IconButton>

        <IconButton>
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
      </div>

      <div className="chat__body">
        <DateBubble date="Wednesday, December 9, 2024" />

        {messages.map((message) => {
          return (
            <Message
              name={message.name}
              text={message.text}
              timestamp={message.timestamp}
              profilePicSrc={message.profilePicSrc}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat__footer">
        <IconButton>
          <FontAwesomeIcon icon={faPlusSquare} />
        </IconButton>

        <form>
          <input ref={inputRef} type="text" />
          <button onClick={sendMessage} />
        </form>

        <IconButton>
          <FontAwesomeIcon icon={faGrin} />
        </IconButton>

        <IconButton>
          <FontAwesomeIcon icon={faMicrophone} />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
