import React from "react";
import { ListGroup } from "react-router-dom";

function Sidebar() {
    const rooms =["first room", "second room", "third room"];
  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>

      <ListGroup.Item
        key={member.id}
        style={{ cursor: "pointer" }}
        active={privateMemberMsg?._id == member?._id}
        onClick={() => handlePrivateMemberMsg(member)}
        disabled={member._id === user._id}
      ></ListGroup.Item>
    </>
  );
}

export default Sidebar;
