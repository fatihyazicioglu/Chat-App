import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import "./Sidebar.css";


function Sidebar() {
  const user = useSelector((state) => state.user);
 function joinRoom(room, isPublic = true) {
  if(!user){
    return alert ('Please login');
  }
  socket.emit('join-room', room);
  setCurrentRoom(room);

  if(isPublic){
    setPrivateMemberMsg(null);
  }
  //dispatch for notifications

 }

  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);
  socket.off("new-user").on("new-user", (payload) => {
    setMembers(payload);
  });

  if (!user) {
    return <></>;
  }
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx} onClick={()=>joinRoom()}>{room} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      {members.map((member) => (
        <ListGroup.Item key={member.id} style={{ cursor: "pointer" }}>
          {member.name}
        </ListGroup.Item>
      ))}
    </>
  );
}

export default Sidebar;

