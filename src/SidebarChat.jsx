import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import {
  doc,
  getDocs,
  collection,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

function SidebarChat({ id, name, message, timestamp }) {
  //Rendu de ma sidebar

  return (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar alt="kamaru" src="/static/images/avatar/3.jpg" />
        <div className="sidebarChat__info">
          <h2>{id}</h2>
          <p>{name}</p>
          <p>{message}</p>
        </div>
        <div className="sidebarChat_timestamp">
          {timestamp.toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
