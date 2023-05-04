import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { orange } from "@mui/material/colors";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  AttachFile,
  InsertEmoticon,
  SearchOutlined,
} from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import { useParams } from "react-router-dom";
import {
  onSnapshot,
  doc,
  orderBy,
  collection,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  console.log(dispatch);
  
  const dummy = useRef();

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 50000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("you typed the input=", input);

    const collectionRef = addDoc(collection(db, "rooms", roomId, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    });

    setInput("");
    dummy.current.scrollIntoView({behavior: 'smooth'});

    return () => {
      collectionRef();
    };
  };
  // console.log(input);

  useEffect(() => {
    if (roomId) {
      const unsub = onSnapshot(doc(db, "rooms", roomId), (doc) => {
        setRoomName(doc.data().name);
        // console.log("Current data: ", doc.data(), unsub());
      });

      let collectionRef = collection(db, "rooms", roomId, "messages");
      let unsubscribe = onSnapshot(
        query(collectionRef, orderBy("timestamp", "asc")),
        (querySnapshot) => {
          setMessages(querySnapshot.docs.map((doc) => doc.data()));
        }
      );

      return () => {
        unsub();
        unsubscribe();
      };
    }
    // return () => {
    //   unsub();
    // };
  }, [roomId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          sx={{ bgcolor: orange[50] }}
          src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${seed}`}
        />
        <div className="chat__headerInfo">
          <h3>
            {/*Room name*/}
            {roomName}
          </h3>
          <p>
            Last seen<span>  </span>  
            {new Date(
              messages[ messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">

        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name === user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}

      </div>
      
      <div className="chat__footer">
      <div ref={dummy}></div>

        <InsertEmoticon />
        <form action="">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message.."
          />
          <button type="submit" onClick={sendMessage}>
            Send message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
