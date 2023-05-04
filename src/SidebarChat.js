import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import db from "./firebase";
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50000));
  }, []);

  useEffect(()=>{
    if(id){
      let collectionRef = collection(db, "rooms", id, "messages")
      let unsubscribe = onSnapshot(query(collectionRef,orderBy("timestamp","desc")),(querySnapshot)=>{
        setMessages(querySnapshot.docs.map((doc)=>(doc.data())));
      });

      return()=>{
        unsubscribe();
      }
    }
    
  },[id])

  const createChat = () => {
    const roomName = prompt("please enter name for chat");
    if (roomName) {
      try {
        const docRef = addDoc(collection(db, "rooms"), {
          name: roomName,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    //do some database stuff
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <>
        <div className="sidebarChat">
          <Avatar
            sx={{ bgcolor: orange[50] }}
            src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`}
          />
          <div className="sidebarChat__Info">
            <h3>
              {name}
              {/*Room name*/}
            </h3>
            <p>{messages[0]?.message}</p>
          </div>
        </div>
      </>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
