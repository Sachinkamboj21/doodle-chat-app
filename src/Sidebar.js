import React, { useEffect,useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChat from "./SidebarChat.js";
import { collection, onSnapshot, query} from "firebase/firestore";
import db from "./firebase";
import { useStateValue } from "./StateProvider";



function Sidebar() {
   
  const [rooms, setRooms] = useState([]);
  const [{ user},dispatch ]= useStateValue();
  console.log(dispatch)

  
  useEffect(() => {
    // fetchAlldata();
    const fetchAlldata = async() =>{
      try{
        const qury = await query(collection(db, "rooms"))
        await onSnapshot(qury, (querySnapshot)=>{
          setRooms(querySnapshot.docs.map((doc)=>({
            id: doc.id,
            data: doc.data()
          })))
        } )
      }
      catch(error){
        console.log(error);
        // toast.error(error);
      }
    }


    //cleanup function
    return ()=> {
      fetchAlldata();
    }
  }, []);
  console.log(rooms);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL}></Avatar>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new Chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
        {/* <SidebarChat />
        <SidebarChat />
        <SidebarChat /> */}
      </div>
    </div>
  );
}

export default Sidebar;
