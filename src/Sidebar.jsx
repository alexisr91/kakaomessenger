import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons";
import {
  faCog,
  faMusic,
  faPlus,
  faSearch,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]); // Affiche par défaut les rooms déjà existants
  // mes props = roomName et setRoomname et non rooms et setRooms, ce sont des variables d'état

  // Le use effect se declenche au moment du rendu

  // Websocket : protocole de communication en continue qui permet de dialoguer et permet d'écouter plusieurs events, différent de l'utilisation de la requete HTTP normale. Il utilise les requetes à faible ressource.

  // SetTimeOut != SetTimeInterval = Set time interval est en interval régulier

  //Timestamp = nombre en millisecond compté depuis 1er janvier 1970. Represente le temps Unix

  // Envoie des données sur firestore
  const createChat = async () => {
    const roomName = prompt("Please enter a name for the chat room");
    if (roomName) {
      await setDoc(doc(db, "rooms", roomName), {
        name: roomName,
        timestamp: new Date(), // Ne pas mettre les méthodes firebase dans l'objet pour rentrer en bdd
        message: "long message",
      });
      // const q = query(collection(db, "rooms"), where("name", "==", roomName));
      // const res = await getDocs(q);
      // const { id, name, message, timestamp } = res.data();
      const docRef = doc(db, "rooms", roomName);
      const docSnap = await getDoc(docRef);
      const milliSec = docSnap.data().timestamp.seconds * 1000;
      const obj = {
        id: docSnap.id,
        name: docSnap.data().name,
        message: docSnap.data().message,
        timestamp: new Date(milliSec), // Donne en format adte
      };
      setRooms([...rooms, obj]); //tu me set mon état de ma variable room dans, les 3 petits points est un spread operator qui permet de recup tous les elements du tableau rooms.
      // Spread operator sur rooms = je recup les elements de l'array et tu me rajoute un nouvel objet de ces elements
      //setRooms est la méthode qui permet de rendre l'objet sans actualiser
    }
  };

  // Côté client de Firebase, quand on utilise un useEffect etc on est forcement coté client, les hook sont coté client, on recupere les données eenvoyés

  // pas conseillé d'utiliser async dans l'useEffect, ne peut pas faire de await
  useEffect(() => {
    const getRooms = async () => {
      // faire une requete et on attend la reponse dans laquelle il est donné
      const q = collection(db, "rooms");
      const res = await getDocs(q); // la methode await permet d'attendre le getDocs(q) pour continuer, il va attendre que les données soient envoyés en base de donnée. Exemple des marathoniens pour  comprendre le async

      const data = res.docs.map((doc) => {
        console.log("my data doc is :", doc.id);
        const milliSec = doc.data().timestamp.seconds * 1000; // Conversion en milliseconds

        return {
          id: doc.id,
          name: doc.data().name,
          message: doc.data().message,
          timestamp: new Date(milliSec), // On crée une nouvelle instance et on met en parametre la constante doc.data.timestamp où on a converti les seconds en milliseconds
        };
      });
      console.log("my data is:", data);
      return data;
    };
    getRooms().then((data) => setRooms(data)); // then: remplace le await / Then on va donc attendre le return data
  }, []);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__headerLeft">
            <h2>Chats</h2>
          </div>
          <div className="sidebar__headerRight">
            <IconButton>
              <FontAwesomeIcon icon={faSearch} />
            </IconButton>

            <IconButton onClick={() => createChat()}>
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faMusic} />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon icon={faCog} />
            </IconButton>
          </div>
        </div>

        <div className="sidebar__chats">
          {rooms.map((room) => {
            // map retourne un nouveau tableau qui s'appelle room
            console.log("the room is:", room);
            return (
              //Rendu du composant sidebar
              <SidebarChat
                key={room.id}
                name={room.name}
                id={room.id}
                message={room.message}
                timestamp={room.timestamp}
                // IL FAUT APPELLER UNE METHODE FIREBASE POUR CONVERTIR LE STRING EN FORMAT DATETIME
              /> // Attribute quand on crée un liste d'element sur React
            );
          })}
        </div>

        <div className="sidebar__footer">
          <IconButton>
            <FontAwesomeIcon icon={faUser} />
          </IconButton>

          <IconButton>
            <FontAwesomeIcon icon={faComment} />
          </IconButton>

          <IconButton>
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>

          <IconButton>
            <FontAwesomeIcon icon={faEllipsisH} />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
